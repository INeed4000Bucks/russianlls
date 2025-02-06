#!/usr/bin/env python3
import os
import re
import uuid
import soundfile as sf
from kokoro import KPipeline

# --- Configuration ---
QA_FILE = 'qa2.txt'
EMBEDS_DIR = os.path.join('public', 'embeds')
VOICE = 'af_heart'   # adjust as needed
LANG_CODE = 'a'      # e.g., 'a' for American English
SPEED = 1
SAMPLE_RATE = 24000

# Maximum allowed filename length (excluding extension)
MAX_FILENAME_LENGTH = 120

# Ensure the embeds directory exists.
os.makedirs(EMBEDS_DIR, exist_ok=True)

# --- Helper Functions ---

def slugify(text):
    """
    Convert text into a URL-friendly slug.
    """
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def truncate_slug(slug, unique_suffix):
    """
    Truncate the slug so that the final filename (slug + '-' + unique_suffix)
    does not exceed MAX_FILENAME_LENGTH characters.
    """
    # We reserve length for '-' plus unique_suffix.
    reserve = len(unique_suffix) + 1
    max_slug_len = MAX_FILENAME_LENGTH - reserve
    if len(slug) > max_slug_len:
        return slug[:max_slug_len]
    return slug

def generate_audio_for_text(text, out_filename):
    """
    Generate TTS audio for the given text using Kokoro and save it to out_filename.
    """
    pipeline = KPipeline(lang_code=LANG_CODE)
    generator = pipeline(text, voice=VOICE, speed=SPEED, split_pattern=r'\n+')
    for i, (gs, ps, audio) in enumerate(generator):
        sf.write(out_filename, audio, SAMPLE_RATE)
        print(f"Audio written to {out_filename}")
        break  # Use only the first chunk

def process_answers_in_first_lesson():
    """
    Process the answer column (second column) of each question in the first lesson.
    For each question, generate a TTS .wav file for the answer text and append
    a literal '\n' plus the embed reference to that answer text.
    Returns the updated file contents as a list of lines.
    """
    with open(QA_FILE, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    lesson_found = False
    question_counter = 0

    # We assume a lesson header is any nonempty line that does not contain a tab.
    for idx, line in enumerate(lines):
        stripped = line.rstrip('\n')
        # If not yet in a lesson and the line doesn't contain a tab, treat as lesson header.
        if not lesson_found and stripped and ('\t' not in stripped):
            lesson_found = True
            new_lines.append(stripped + "\n")
            continue

        if lesson_found:
            # If the line is part of the lesson and contains a tab, process it as a question line.
            if '\t' in stripped:
                parts = stripped.split('\t')
                if len(parts) < 2:
                    new_lines.append(line)
                    continue

                # Extract the original answer from the second column.
                orig_answer = parts[1].strip()

                # Generate a unique filename for the answer audio.
                unique_suffix = uuid.uuid4().hex[:8]
                slug = slugify(orig_answer) or "answer"
                slug = truncate_slug(slug, unique_suffix)
                audio_filename = f"{slug}-{unique_suffix}.wav"
                audio_path = os.path.join(EMBEDS_DIR, audio_filename)
                embed_code = f"\\n[/embeds/{audio_filename}]"  # Use literal \n

                try:
                    print(f"Generating audio for answer: {orig_answer}")
                    generate_audio_for_text(orig_answer, audio_path)
                except Exception as e:
                    print(f"Error generating audio for answer '{orig_answer}': {e}")
                    embed_code = "\\n[ERROR: Audio not generated]"

                # Append embed code to the original answer text.
                # If the embed code is not already present, update the answer column.
                if embed_code not in orig_answer:
                    parts[1] = orig_answer + embed_code

                # Reconstruct the line with tab separation.
                updated_line = "\t".join(parts)
                new_lines.append(updated_line + "\n")
                question_counter += 1
            else:
                # End processing if we hit a new lesson header.
                if stripped and ('\t' not in stripped):
                    lesson_found = False
                new_lines.append(line)
        else:
            new_lines.append(line)

    print(f"Processed {question_counter} answer(s) in the first lesson.")
    return new_lines

def write_updated_qa(new_lines):
    with open(QA_FILE, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print("qa2.txt has been updated.")

# --- Main Script Execution ---
if __name__ == '__main__':
    updated_lines = process_answers_in_first_lesson()
    write_updated_qa(updated_lines)
