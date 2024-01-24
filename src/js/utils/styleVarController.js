function createStyleVar() {
  const headTag = document.getElementsByTagName("head")[0];
  const styleTag = document.createElement("style");
  // eslint-disable-next-line no-undef
  const varMap = new Map();
  const renderStyleVar = () => {
    const entriesOfMap = Array.from(varMap.entries()).map((arr) =>
      arr.join(":")
    );
    styleTag.innerHTML = `
      :root {
        ${entriesOfMap.join(";")}
      }
    `;
  };
  headTag.appendChild(styleTag);
  return {
    addStyleVar: (name, value) => {
      varMap.set(name, value);
      renderStyleVar();
    },
    updateStyleVar: (name, value) => {
      if (!varMap.has(name)) {
        return;
      }
      varMap.set(name, value);
      renderStyleVar();
    },
  };
}
const styleVarController = createStyleVar();

export default styleVarController;
