const newComment = async (event) => {
  const id = event.target.getAttribute('data-id');
  document.location.replace(`/newcomment/=${id}`);
}

document.querySelector('#comment').addEventListener('click', newComment);