const newPost = async () => {
  
  document.location.replace('/newpost');
}

document.querySelector('#newpost').addEventListener('click', newPost);