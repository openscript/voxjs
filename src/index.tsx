import { h, render } from "preact";
import { App } from "./containers/app";

const parent = document.getElementById("voxjs");

if (parent) {
    render(<App />, parent)
}