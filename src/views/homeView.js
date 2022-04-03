function createHomeView() {
  const root = document.createElement('section');
  root.className = 'home-container';
  root.innerHTML = String.raw`
    <h3>Which word would you like to look up?</h3>
    <form>
      <input type="text">
      <button>Show me!</button>
    </form>
  `;

  return { root };
}

export default createHomeView;
