const postRoute = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#titleinput').value;
  const content = document.querySelector('#postinput').value;

  if (title && content) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};
  
document.querySelector('#post').addEventListener('click', postRoute);
  