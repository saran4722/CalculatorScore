function saveScores() {
      let scores = {
        math: document.getElementById('math').value,
        khmer: document.getElementById('khmer').value,
        physics: document.getElementById('physics').value,
        chemistry: document.getElementById('chemistry').value,
        biology: document.getElementById('biology').value,
        english: document.getElementById('english').value
      };
      localStorage.setItem('scores', JSON.stringify(scores));
      window.location.href = 'output.html';
    }
//index output
    function calculateScore() {
      let scores = JSON.parse(localStorage.getItem('scores'));
      if (!scores) return;

      let math = Number(scores.math);
      let khmer = Number(scores.khmer);
      let physics = Number(scores.physics);
      let chemistry = Number(scores.chemistry);
      let biology = Number(scores.biology);
      let english = Number(scores.english);

      let total = math + khmer + physics + chemistry + biology + english;
      let average = total / 6;

      // Grade conditions
      let grade = '';
      if (average >= 472) grade = 'A+';
      else if (average > 427 && average <= 471) grade = 'A';
      else if (average > 380 && average <= 426) grade = 'B';
      else if (average > 332 && average <= 379) grade = 'C';
      else if (average > 285 && average <= 331) grade = 'D';
      else if (average > 227 && average <= 284) grade = 'E';
      else grade = 'F';

      let result = (average >= 50) ? 'ជាប់ ✅' : 'ធ្លាក់ ❌';

      // Show results
      document.getElementById('total').textContent = total;
      document.getElementById('average').textContent = average.toFixed(2);
      document.getElementById('grade').textContent = grade;
      document.getElementById('result').textContent = result;
    }

    window.onload = calculateScore;

    // back-end
     async function login() {
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();

      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        localStorage.setItem('user', username);
        window.location.href = 'index.html';
      }
    }
  