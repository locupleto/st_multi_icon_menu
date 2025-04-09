
import React from "react"
import ReactDOM from "react-dom"
import MenuComponent from "./AntMenu"

// Lots of import to define a Styletron engine and load the light theme of baseui


// Wrap your CustomSlider with the baseui them
ReactDOM.render(
  <React.StrictMode>
    <MenuComponent />
  </React.StrictMode>,
  document.getElementById("root")
)