import $ from "jquery";
import loadScriptPromise from "../../js/utils/loadScript";

async function addYMap() {
  await loadScriptPromise(
    "https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=<ваш API-ключ>"
  );
  ymaps.load(yMapInit);
}
function yMapInit() {
  const map = new ymaps.Map("map", {
    center: [56.32503506840652, 44.023467499999995],
    zoom: 16,
    controls: [],
  });
  const destination = new ymaps.Placemark(
    [56.32503506840652, 44.023467499999995],
    {},
    {
      
      iconImageHref: "/local/templates/persona_ch/img/pin.svg",
      // iconImageSize: [320, 400],
      // iconImageOffset: [-320, -400],
    }
  );
  map.geoObjects.add(destination);
  const layer = map.layers.get(0).get(0);

  waitForTilesLoad(layer).then(function () {
    $(".preloader").addClass("preloader--endloaded");
    setTimeout(() => {
      $(".preloader").remove();
    }, 1000);
  });
  $(".map-popup__zoom-in").on("click", () => map.setZoom(map.getZoom() + 1));
  $(".map-popup__zoom-out").on("click", () => map.setZoom(map.getZoom() - 1));
}
function waitForTilesLoad(layer) {
  return new ymaps.vow.Promise(function (resolve, reject) {
    var tc = getTileContainer(layer),
      readyAll = true;
    tc.tiles.each(function (tile, number) {
      if (!tile.isReady()) {
        readyAll = false;
      }
    });
    if (readyAll) {
      resolve();
    } else {
      tc.events.once("ready", function () {
        resolve();
      });
    }
  });
}

function getTileContainer(layer) {
  for (var k in layer) {
    if (layer.hasOwnProperty(k)) {
      if (
        layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer ||
        layer[k] instanceof ymaps.layer.tileContainer.DomContainer
      ) {
        return layer[k];
      }
    }
  }
  return null;
}

$(function () {
  let isMapLoaded = false;
  $(".map-popup__open").on("click", function () {
    $("body").addClass("no-scroll");
    $(".map-popup").removeClass("form-popup--hide");
    $(".map-popup").addClass("form-popup--show");
    $(".map-popup").show();
    //Map Yandex
    if (!isMapLoaded) {
      $(".map-popup__inner").append("<div class='preloader'></div>");
      addYMap();
      isMapLoaded = true;
    }
  });
  $(".map-popup__close").on("click", function () {
    if ($("body").hasClass("no-scroll")) {
      $("body").removeClass("no-scroll");
    }
    $(".map-popup").removeClass("form-popup--show");
    $(".map-popup").addClass("form-popup--hide");
    setTimeout(() => {
      $(".map-popup").hide();
      $(".map-popup").removeClass("form-popup--hide");
    }, 500);
  });
  $(document).on("keyup", function (e) {
    if (e.key == "Escape" && $(".map-popup").hasClass("form-popup--show")) {
      if ($("body").hasClass("no-scroll")) {
        $("body").removeClass("no-scroll");
      }
      $(".map-popup").removeClass("form-popup--show");
      $(".map-popup").addClass("form-popup--hide");
      setTimeout(() => {
        $(".map-popup").hide();
        $(".map-popup").removeClass("form-popup--hide");
      }, 500);
    }
  });
});
