import React, { useEffect } from "react";

const TableauViz = () => {
  useEffect(() => {
    // Dynamically load the Tableau visualization
    const divElement = document.getElementById("vizContainer");
    const vizElement = divElement.getElementsByTagName("object")[0];
    vizElement.style.width = "100%";
    vizElement.style.height = divElement.offsetWidth * 0.75 + "px";

    const scriptElement = document.createElement("script");
    scriptElement.src = "https://public.tableau.com/javascripts/api/viz_v1.js";
    vizElement.parentNode.insertBefore(scriptElement, vizElement);
  }, []);

  return (
    <div className="tableau-container" style={{ width: "100%", padding: "20px" }}>
      <div
        className="tableauPlaceholder"
        id="vizContainer"
        style={{ position: "relative", width: "100%", height: "800px" }}  // Increase height
      >
        <noscript>
          <a href="#">
            <img
              alt=" "
              src="https://public.tableau.com/static/images/Ne/NewarkCrimeGraphs/Sheet2/1_rss.png"
              style={{ border: "none" }}
            />
          </a>
        </noscript>
        <object className="tableauViz" style={{ display: "none" }}>
          <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
          <param name="embed_code_version" value="3" />
          <param name="site_root" value="" />
          <param name="name" value="NewarkCrimeGraphs/Sheet2" />
          <param name="tabs" value="yes" />
          <param name="toolbar" value="yes" />
          <param
            name="static_image"
            value="https://public.tableau.com/static/images/Ne/NewarkCrimeGraphs/Sheet2/1.png"
          />
          <param name="animate_transition" value="yes" />
          <param name="display_static_image" value="yes" />
          <param name="display_spinner" value="yes" />
          <param name="display_overlay" value="yes" />
          <param name="display_count" value="yes" />
          <param name="language" value="en-US" />
        </object>
      </div>
    </div>
  );
};

export default TableauViz;
