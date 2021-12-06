const commentRoute = async (event) => {
    event.preventDefault();

    let dl = document.location.pathname
    let split = dl.split('=')
    post_id = split[1]
    const text = document.querySelector('#commentinput').value;
  
    if (text) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ text, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/posts/${post_id}`);
      } else {
        alert(response.statusText);
      }
    }
  };
    
  document.querySelector('#post').addEventListener('click', commentRoute);