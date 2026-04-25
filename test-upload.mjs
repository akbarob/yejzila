async function run() {
  const formData = new FormData();
  formData.append('fullName', 'Test User');
  formData.append('email', 'test@example.com');
  formData.append('jobId', 'test-job-id');
  
  const blob = new Blob(['dummy content'], { type: 'text/plain' });
  formData.append('resume', blob, 'resume.txt');

  try {
    const res = await fetch('http://localhost:3000/api/applications', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    console.log('Status:', res.status);
    console.log('Response:', data);
  } catch (err) {
    console.error(err);
  }
}
await run();
