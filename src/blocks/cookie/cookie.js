function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

if (document.querySelector(".cookie") && !getCookie("isVisited") ) {
  const container = document.querySelector(".cookie");
  const apply = container.querySelector(".cookie__apply");
  container.classList.add("cookie--show");
  apply.addEventListener("click", () => {
    document.cookie = "isVisited=true; max-age=2592000; path=/";
    container.classList.remove("cookie--show");
  });
}
