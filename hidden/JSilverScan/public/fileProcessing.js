const fileInput = document.querySelector('#fileInput');
const outputContainer = document.querySelector('#outputContainer');
const unincluded = [',', ' ', '.', ';', '\u200B', '，', '？', '\v', '\n', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '。', '【', '】', '：', '“', '”', '，'];

fileInput.addEventListener('change', (event) => {
  const files = event.target.files;
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();
    reader.readAsText(file, 'utf8');
    
    reader.onload = () => {
      console.time('Processor: ')
      const input = reader.result;
      const frequency = {};
      for (let i = 0; i < input.length; i++) {
        const char = input[i];
        if (char in frequency) {
          frequency[char] += 1;
        } else if (!unincluded.includes(char)) {
          frequency[char] = 1;
        }
      }
      console.timeEnd('Processor: ')
      const now = new Date();
      const date_time_str = now.toISOString().replace(/[:.]/g, '-').replace('T', '--').slice(0, -5);
      let output = '';
      for (const char in frequency) {
        output += `${char}: ${frequency[char]}\n`;
      }

      const link = document.createElement('a');
      
      link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(output));
      link.setAttribute('download', `${date_time_str} out${i}.txt`);
      link.setAttribute('class', 'link');
      link.style.visibility = 'hidden';
      
      
      link.innerHTML = `Download ${file.name} results`;

      // link.addEventListener('mouseenter', () => {
      //   link.style.filter = 'blur(20px)';
      // });
      
      // link.addEventListener('mouseleave', () => {
      //   link.style.filter = 'blur(0px)';
      // });

      
      outputContainer.appendChild(link);
      
      window.requestAnimationFrame(() => {
        link.style.visibility = 'visible';
        link.style.opacity = '1';
      });

      // outputContainer.appendChild(document.createElement('br'));

      
    };
  }
});