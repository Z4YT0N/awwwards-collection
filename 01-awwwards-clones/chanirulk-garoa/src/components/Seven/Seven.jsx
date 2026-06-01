import "./seven.css";
import COVER from "../img/ingre.png";
import React from "react";

const Seven = () => {
  return <div className="seven">
    <div className="cover-drop">
        <div className="ingr-head">Natural <br />
        Ingredients
        </div>
        <p className="ingr-about">
        Garoa is all about natural ingredients, we are a 100% transparent about the origin of all <br />
        the ingredients that we use in our products. The ingredients come mainly from Brazil's vast <br />
        Amazon rainforest and from the Scottish Highlands. With this combination of places we balance <br />
        ingredients from both cold, humid and warm, atlantic atlitudes. <br />
        <br />
        Here's a list of all ingredients that we using for this season. 
        </p>
        <table>
        <tr>
            <td>Pure Water</td>
            <td>Amazon Rainforest</td>
            <td className="change">Water Aqua</td>
        </tr>
        <tr>
            <td>Woods</td>
            <td>Amazon Rainforest</td>
            <td className="change">Cedrus Atlantica</td>
        </tr>
        <tr>
            <td>Fruit Oils</td>
            <td>Northeast Brazil</td>
            <td className="change">Coco-Betaine</td>
        </tr>
        <tr>
            <td>Antioxidants</td>
            <td>--</td>
            <td className="change">Coamide DEA</td>
        </tr>
        <tr>
            <td>Salts</td>
            <td>Southeast Brazil</td>
            <td className="change">Sea Salt Maris</td>
        </tr>
        <tr>
            <td>Fruit Extracts</td>
            <td>Amazon Rainforest</td>
            <td className="change">Sald-Limonenem</td>
        </tr>
        <tr>
            <td>Fruit Oils</td>
            <td>Amazon Rainforest</td>
            <td className="change">Nobilis Manda</td>
        </tr>
        <tr>
            <td>Fruit Oils</td>
            <td>Amazon Rainforest</td>
            <td className="change">Peel Oil</td>
        </tr>
        <tr>
            <td>Wood Oils</td>
            <td>Scottish Highlands</td>
            <td className="change">Cedarwood</td>
        </tr>
        <tr>
            <td>Flower Oil Extracts</td>
            <td>Scottish Highlands</td>
            <td className="change">Bark Oil</td>
        </tr>
        <tr>
            <td>Flower Oil Extracts</td>
            <td>Scottish Highlands</td>
            <td className="change">Bark Oil</td>
        </tr>
        <tr>
            <td>Wood Oils</td>
            <td>Scottish Highlands</td>
            <td className="change">Cedarwood</td>
        </tr>
        <tr>
            <td>Flower Oil Extracts</td>
            <td>Scottish Highlands</td>
            <td className="change">Bark Oil</td>
        </tr>
        <tr>
            <td>Flower Oil Extracts</td>
            <td>Scottish Highlands</td>
            <td className="change">Bark Oil</td>
        </tr>
        <tr>
            <td>Wood Oils</td>
            <td>Scottish Highlands</td>
            <td className="change">Cedarwood</td>
        </tr>
        <tr>
            <td>Flower Oil Extracts</td>
            <td>Scottish Highlands</td>
            <td className="change">Bark Oil</td>
        </tr>
        <tr>
            <td>Flower Oil Extracts</td>
            <td>Scottish Highlands</td>
            <td className="change">Bark Oil</td>
        </tr>
        </table>
        <img src={COVER} alt="" className="cover-pic" />
    </div>
  </div>;
};

export default Seven;
