#!/usr/bin/env python3
import os
import re
import uuid
import soundfile as sf
from kokoro import KPipeline

# --- Configuration ---
QA_FILE = 'qa2.txt'
EMBEDS_DIR = os.path.join('public', 'embeds')
VOICE = 'af_heart'   # adjust as needed; ensure lang_code matches voice
LANG_CODE = 'a'      # 'a' for American English; 'b' for British English
SPEED = 1
SAMPLE_RATE = 24000

# Ensure the embeds directory exists.
os.makedirs(EMBEDS_DIR, exist_ok=True)

# --- Helper Functions ---

def slugify(text):
    """Create a URL-friendly slug from the given text."""
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def generate_audio_for_text(text, out_filename):
    """
    Generate TTS audio for the given text using Kokoro,
    and save the .wav file to out_filename.
    """
    pipeline = KPipeline(lang_code=LANG_CODE)
    generator = pipeline(text, voice=VOICE, speed=SPEED, split_pattern=r'\n+')

    for i, (gs, ps, audio) in enumerate(generator):
        sf.write(out_filename, audio, SAMPLE_RATE)
        print(f"Audio written to {out_filename}")
        break  # stop after first chunk

def process_first_lesson():
    """
    Process the first lesson found in qa2.txt.
    For each question in that lesson, generate a .wav file
    and append the audio embed to the first column using \n (literal).
    """
    with open(QA_FILE, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    lesson_found = False
    question_counter = 0

    for idx, line in enumerate(lines):
        stripped = line.strip('\n')
        # Detect first lesson header (any non-empty line without a tab)
        if not lesson_found and stripped and ('\t' not in stripped):
            lesson_found = True  # We found the first lesson
            new_lines.append(stripped + '\n')
            continue

        # Process the questions in the first lesson only
        if lesson_found and '\t' in stripped:
            parts = stripped.split('\t')
            if not parts:
                new_lines.append(line)
                continue

            # Extract question text
            orig_question = parts[0].strip()

            # Generate unique filename
            unique_suffix = uuid.uuid4().hex[:8]
            slug = slugify(orig_question) or "question"
            audio_filename = f"{slug}-{unique_suffix}.wav"
            audio_path = os.path.join(EMBEDS_DIR, audio_filename)
            embed_code = f"\\n[/embeds/{audio_filename}]"  # Append as a literal \n

            try:
                print(f"Generating audio for: {orig_question}")
                generate_audio_for_text(orig_question, audio_path)
            except Exception as e:
                print(f"Error generating audio for '{orig_question}': {e}")
                embed_code = "\\n[ERROR: Audio not generated]"

            # Append embed within the same line using \n (literal, NOT actual newline)
            if embed_code not in orig_question:
                parts[0] = orig_question + embed_code  # Modify only the first column

            # Rejoin the modified line
            updated_line = "\t".join(parts)
            new_lines.append(updated_line + "\n")
            question_counter += 1
        else:
            new_lines.append(line)

    print(f"Processed {question_counter} questions in the first lesson.")
    return new_lines

def write_updated_qa(new_lines):
    with open(QA_FILE, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print("qa2.txt has been updated.")

# --- Main Script Execution ---

if __name__ == '__main__':
    updated_lines = process_first_lesson()
    write_updated_qa(updated_lines)
