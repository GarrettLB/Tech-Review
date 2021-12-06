const updateRoute = async (event) => {
    event.preventDefault();
  
    const id = document.querySelector('#id').value;
    const title = document.querySelector('#titleinput').value;
    const content = document.querySelector('#postinput').value;
  
    if (title && content) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
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
    
  document.querySelector('#update').addEventListener('click', updateRoute);