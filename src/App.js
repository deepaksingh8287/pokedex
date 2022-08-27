import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Dialog } from "primereact/dialog";
import "./DialogDemo.css";
import { Paginator } from "primereact/paginator";
import { InputText } from "primereact/inputtext";

function App() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(1);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [image, setImage] = useState("");
  const [contentFirst, setContentFirst] = useState(0);
  const [searchText, setSearchText] = useState("");
  console.log("image", image, contentFirst, index);
  const fetchApi = async () => {
    const res = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/ditto?limit=100"
    );
    setData(res.data);
    console.log(res.data);
  };

  const onContentPageChange = (event) => {
    setContentFirst(event.first);
    setIndex(event.first * 20);
  };
  useEffect(() => {
    fetchApi();
  }, []);
  const filteredData = data?.game_indices?.filter((el) => {
    //if no input the return the original
    if (searchText === "") {
      return el;
    }
    //return the item which contains the user input
    else {
      return el.version.name.toLowerCase().includes(searchText);
    }
  });
  return (
    <div className="">
      <div className="main">
        <div className="search">
          <InputText
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Search"
            placeholder="Please Search Pokemon"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <select name="type" id="type">
            {data?.types?.map((value) => {
              return <option value={value.type.name}>{value.type.name}</option>;
            })}
          </select>
        </div>
      </div>
      <div className="row w-100 m-auto">
        {filteredData?.map((value, index1) => {
          return (
            <div
              className="col-lg-3 col-md-4 col-sm-6 col-12 my-3"
              key={index1}
            >
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  style={{ backgroundColor: "#F2F2F2", height: "300px" }}
                  src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${
                    index1 + 1
                  }.svg`}
                />
                <Card.Title className="my-1" style={{ textAlign: "center" }}>
                  {value.version.name}
                </Card.Title>
                <Card.Text></Card.Text>
                <Button
                  variant="primary"
                  onClick={() => {
                    setImage(index1 + 1), setDisplayBasic(true);
                  }}
                >
                  click to open
                </Button>
              </Card>
            </div>
          );
        })}
      </div>
      <Paginator
        first={contentFirst}
        rows={1}
        totalRecords={120}
        onPageChange={onContentPageChange}
        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      ></Paginator>
      <Dialog
        header="Pokemon information"
        visible={displayBasic}
        style={{ width: "70vw", height: "60vh" }}
        onHide={() => setDisplayBasic(false)}
      >
        <div className="row">
          <div className="col-lg-6 col-12">
            <img
              style={{ height: "320px" }}
              src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${image}.svg`}
            />
          </div>
          <div className="col-lg-6 col-12">
            The original Pokémon is a role-playing game based around building a
            small team of monsters to battle other monsters in a quest to become
            the best. Pokémon are divided into types, such as water and fire,
            each with different strengths. Battles between them can be likened
            to the simple hand game rock-paper-scissors The original Pokémon is
            a role-playing game based around building a small team of monsters
            to battle other monsters in a quest to become the best. Pokémon are
            divided into types, such as water and fire, each with different
            strengths. Battles between them can be likened to the simple hand
            game rock-paper-scissors
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default App;
