(function () {
  //   const wfsStyle = new WfsStyle();
  //   wfsStyle.getStyleObject({ pt: 100 });
  //   const wfs = new WfsChildDOM("classSystem");
  //   const div = wfs.div.bind(wfs);
  //   const h = wfs.headding.bind(wfs);
  //   const ul = wfs.unorderList.bind(wfs);
  //   const li = wfs.list.bind(wfs);
  //   const img = wfs.image.bind(wfs);
  //   const p = wfs.paragraph.bind(wfs);
  //   //   const a = wfs.img.bind(wfs);
  //   //   const span = wfs.img.bind(wfs);
  //   //   const sup = wfs.sup.bind(wfs);
  //   const list = [
  //     div("section_2 slider-mobile-wrapper", [
  //       div("yellow-bar-wrapper", [div("yellow-bar ml-0")]),
  //       h("2", ["Bank your way with confidence"]),
  //       div("show-desktop", [
  //         div("tab-cover", [
  //           ul("nav", [
  //             li("tablinks active", ["Plan for the future you want"], {
  //               tabIndex: "0",
  //               dataTarget: "tab-one"
  //             }),
  //             li("tablinks", ["Need help? Ask Fargo®"], {
  //               tabIndex: "0",
  //               dataTarget: "tab-two"
  //             }),
  //             li("tablinks", ["Focus on your finances"], {
  //               tabIndex: "0",
  //               dataTarget: "tab-three"
  //             })
  //           ]),
  //           div(
  //             "tabcontent active",
  //             [
  //               div("image-block", [img("w-100", "LifeSync", "LifeSync")]),
  //               div("caption", [p()], { tabIndex: "-1" })
  //             ],
  //             { id: "tab-one" }
  //           )
  //         ])
  //       ])
  //     ])
  //   ];
  //   wfs.renderDom(list);

  const modal = new WfsModal("wfs-modal-target");
  modal.renderModal({ backgroud: true });
})();
