import React, { useRef,useEffect, useState } from "react";
import { MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Aicon from "../assets/A.png";
import Bicon from "../assets/B.png";
import Cicon from "../assets/C.png";
import Dicon from "../assets/dE.png";
const URL = "http://localhost:5000/api/paths";
const History = ({setcordslng,setcordslat}) => {
  const [pathtitle, setPathtitle] = useState("path1");
  const [pathdistance, setPathdistance] = useState(0);
  const [pathuser, setPathuser] = useState();
  
  const pathid= useRef();
  const history = useHistory();

  const varlat = useRef();
  const varlng = useRef();
  const varlat1= useRef();
  const varlng1 = useRef();
  const varlat2= useRef();
  const varlng2 = useRef();
  const varlat3= useRef();
  const varlng3 = useRef();
  const varlat4= useRef();
  const varlng4 = useRef();

  
  const [APIMAPS, setAPIMAPS] = useState([]);

  const [p, setP] = useState([]);
  const [paths, setPaths] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [mini, setMini] = useState(0);
  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(0);
  const [p3, setP3] = useState(0);
  const [p4, setP4] = useState(0);
  const [p5, setP5] = useState(0);
  const [p6, setP6] = useState(0);

  var AB, CD, BC, AC, AD, BD, D1, D2, D3, D4, D5, D6;
  AB = Math.round(localStorage.getItem("AB"));
  BC = Math.round(localStorage.getItem("BC"));
  CD = Math.round(localStorage.getItem("CD"));
  AC = Math.round(localStorage.getItem("AC"));
  AD = Math.round(localStorage.getItem("AD"));
  BD = Math.round(localStorage.getItem("BD"));

  function handleSubmit(e) {
    e.preventDefault();
    D1 = AD + CD + BC;
    D2 = AD + BD + BC;
    D3 = AB + BD + CD;
    D4 = AB + BC + CD;
    D5 = AC + BC + BD;
    D6 = AC + CD + BD;
    console.log(D1);
    console.log(D2);
    console.log(D3);
    console.log(D4);
    console.log(D5);
    console.log(D6);
    const min = Math.min(D1, D2, D3, D4, D5, D6);
    if (min == D1) {
      console.log("A-->D-->C--->B");
      setP1(1);
    } else if (min == D2) {
      console.log("A-->D-->B--->C");
      setP2(1);
    } else if (min == D3) {
      console.log("A-->B-->D--->C");
      setP3(1);
    } else if (min == D4) {
      console.log("A-->B-->C--->D");
      setP4(1);
    } else if (min == D5) {
      console.log("A-->C-->B--->D");
      setP5(1);
    } else if (min == D6) {
      console.log("A-->C-->D--->B");
      setP6(1);
    }

    setMini(min);
    setPathdistance(min);
    setP(
      [
        ...p,
        {
          lat: localStorage.getItem("pt1lat"),
          lng: localStorage.getItem("pt1lng"),
          color: "blue",
        },
        {
          lat: localStorage.getItem("pt2lat"),
          lng: localStorage.getItem("pt2lng"),
          color: "red",
        },
        {
          lat: localStorage.getItem("pt3lat"),
          lng: localStorage.getItem("pt3lng"),
          color: "green",
        },
        {
          lat: localStorage.getItem("pt4lat"),
          lng: localStorage.getItem("pt4lng"),
          color: "black",
        },
      ]

      /* (pt2lng = localStorage.getItem("pt2lng")),
      (pt2lat = localStorage.getItem("pt2lat")),
      (pt2color = "red"),
      (pt3lng = localStorage.getItem("pt3lng")),
      (pt3lat = localStorage.getItem("pt3lat")),
      (pt3color = "green"),
      (pt4lng = localStorage.getItem("pt4lng")),
      (pt4lat = localStorage.getItem("pt4lat")),*/
    );

    console.log("the shortest path  possible  in KM is  ", min);
    let graph = [
      [2, 7, 6],
      [0, 2, 1],
      [0, 1, 1],
      [3, 5, 6],
      [4, 8, 3],
      [2, 5, 3],
    ];
    /*dijkstra(graph, 0);*/
    setPathuser(localStorage.getItem("userid").slice(1, -1));
  }
  const handlePath = async (e) => {
    e.preventDefault();

    console.log(pathtitle, pathuser, pathdistance);

    try {
      setShouldRefresh(!shouldRefresh);
      const config = {
        headers: {
          "content-type": "application/json",
        },
        header: "Access-Control-Allow-Origin, http://localhost:8080",
      };
      let lng,
        lat,
        pt2lng,
        pt2lat,
        pt3lng,
        pt3lat,
        pt4lng,
        pt4lat,
        color,
        pt2color,
        pt3color,
        pt4color;

      let title = pathtitle;
      let user = pathuser;
      let distance = pathdistance;
      let points = p;
      console.log(title, user, distance, p);

      const { data } = await axios.post(
        URL,
        { title, distance, user, points },

        config
      );

      console.log(data, "data");
    } catch (errore) {}
  };
  let V = 6;
  function minDistance(dist, sptSet) {
    // Initialize min value
    let min = Number.MAX_VALUE;
    let min_index = -1;

    for (let v = 0; v < V; v++) {
      if (sptSet[v] == false && dist[v] <= min) {
        min = dist[v];
        min_index = v;
      }
    }
    return min_index;
  }
  useEffect(() => {
    let idUser = localStorage.getItem("userid").slice(1, -1);
    axios
      .get(URL + `/user/${idUser}`)
      .then((res) => {
        console.log(res.data);
        setPaths(res.data);
        console.log(res.data,"testbd")
        {paths.map((path) => {
      
          varlat.current =Math.round(path.points[0].lat);
             varlng.current =Math.round(path.points[0].lng);

             
             
             
           
         })}
         axios
         .get(
           "https://api.mapbox.com/geocoding/v5/mapbox.places/"+res.data[0].points[0].lng+"%2C"+res.data[0].points[0].lat+".json?access_token=pk.eyJ1IjoicmF5ZW5iZCIsImEiOiJja3J1ZmZsYXIzdDAxMm9wZTdna2RxbmIwIn0.kqjiFe-ZOMlb97bJ0mBStw"
         )
         .then((res => {
           console.log(res.data.features, "data");
           setAPIMAPS(res.data.features);
           console.log(APIMAPS, " PERA3333");
         }));
      })
      .catch((error) => console.error(`Error : ${error}`));
    
  }, [shouldRefresh]);

  const handleDisplay = async (e) => {
 
    e.preventDefault();
    let idUser = localStorage.getItem("userid").slice(1, -1);
    axios
      .get(URL + `/user/${idUser}`)
      .then((res) => {
        console.log(res.data);
        setPaths(res.data);
        console.log(res.data,"testbd")
        {paths.map((path) => {
      
          varlat.current =Math.round(path.points[0].lat);
             varlng.current =Math.round(path.points[0].lng);

             
             
             
           
         })}
         axios
         .get(
           "https://api.mapbox.com/geocoding/v5/mapbox.places/"+res.data[0].points[0].lng+"%2C"+res.data[0].points[0].lat+".json?access_token=pk.eyJ1IjoicmF5ZW5iZCIsImEiOiJja3J1ZmZsYXIzdDAxMm9wZTdna2RxbmIwIn0.kqjiFe-ZOMlb97bJ0mBStw"
         )
         .then((res => {
           console.log(res.data.features, "data");
           setAPIMAPS(res.data.features);
           console.log(APIMAPS, " PERA3333");
         }));
      })
      .catch((error) => console.error(`Error : ${error}`));

   

    
  };
   const handleDelete = async(e) => {
    e.preventDefault();
    const headers = {
      Authorization: "Bearer my-token",
      "My-Custom-Header": "foobar",
    };
    axios
      .delete("http://localhost:5000/api/paths/" + pathid.current, {
        headers,
      })
      .then(() => {setShouldRefresh(!shouldRefresh);
        console.log(pathid.current,"deleted");
      });
   



   }
   const handleSelect = async(e) => {
     e.preventDefault();
     history.push("/map/"+pathid.current);

     
     setcordslat([varlat1.current,varlat2.current,varlat3.current,varlat4.current]);
     setcordslng([varlng1.current,varlng2.current,varlng3.current,varlng4.current]);
     
     

   }

  // A utility function to print
  // the constructed distance array
  function printSolution(dist) {
    document.write("Vertex \t\t Distance from Source<br>");
    for (let i = 0; i < V; i++) {
      document.write(i + " \t\t " + dist[i] + "<br>");
    }
  }

  // Function that implements Dijkstra's
  // single source shortest path algorithm
  // for a graph represented using adjacency
  // matrix representation
  function dijkstra(graph, src) {
    let dist = new Array(V);
    let sptSet = new Array(V);

    // Initialize all distances as
    // INFINITE and stpSet[] as false
    for (let i = 0; i < V; i++) {
      dist[i] = Number.MAX_VALUE;
      sptSet[i] = false;
    }

    // Distance of source vertex
    // from itself is always 0
    dist[src] = 0;

    // Find shortest path for all vertices
    for (let count = 0; count < V - 1; count++) {
      // Pick the minimum distance vertex
      // from the set of vertices not yet
      // processed. u is always equal to
      // src in first iteration.
      let u = minDistance(dist, sptSet);

      // Mark the picked vertex as processed
      sptSet[u] = true;

      // Update dist value of the adjacent
      // vertices of the picked vertex.
      for (let v = 0; v < V; v++) {
        // Update dist[v] only if is not in
        // sptSet, there is an edge from u
        // to v, and total weight of path
        // from src to v through u is smaller
        // than current value of dist[v]
        if (
          !sptSet[v] &&
          graph[u][v] != 0 &&
          dist[u] != Number.MAX_VALUE &&
          dist[u] + graph[u][v] < dist[v]
        ) {
          dist[v] = dist[u] + graph[u][v];
        }
      }
    }

    // Print the constructed distance array
    printSolution(dist);
  }

  return (
    
    <div>
      {(() => {
        if (p1 == 1) {
          return (
            <div>
              <MDBListGroup tag="div">
                <MDBListGroupItem
                  tag="a"
                  href="#"
                  action
                  active
                  aria-current="true"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <img src={Aicon} height="50" width="50"></img>
                    <img src={Dicon} height="50" width="50"></img>
                    <img src={Cicon} height="50" width="50"></img>
                    <img src={Bicon} height="50" width="50"></img>
                  </div>
                  <p className="  badge-success h2 ">
                    the shortest path possible in KM is {mini}
                    {paths.color}
                  </p>
                  <input
                    type="text"
                    class="woocommerce-Input woocommerce-Input--text input-text form-control mywidth"
                    id="pathtitle"
                    value={pathtitle}
                    onChange={(e) => setPathtitle(e.target.value)}
                  />
                  <button onClick={handlePath}>Add path</button>
                  <button onClick={handleDisplay}>Display paths</button>
                  <button onClick={handleSubmit}>Calcute shortest distance</button>
                </MDBListGroupItem>
              </MDBListGroup>
            </div>
          );
        } else if (p2 == 1) {
          return (
            <div>
              <MDBListGroup tag="div">
                <MDBListGroupItem
                  tag="a"
                  href="#"
                  action
                  active
                  aria-current="true"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <img src={Aicon} height="50" width="50"></img>
                    <img src={Dicon} height="50" width="50"></img>
                    <img src={Bicon} height="50" width="50"></img>
                    <img src={Cicon} height="50" width="50"></img>
                  </div>
                  <p className="  badge-success h2 ">
                    the shortest path possible in KM is {mini}
                  </p>
                  <input
                    type="text"
                    class="woocommerce-Input woocommerce-Input--text input-text form-control mywidth"
                    id="pathtitle"
                    value={pathtitle}
                    onChange={(e) => setPathtitle(e.target.value)}
                  />
                  <button onClick={handlePath}>Add path</button>
                  <button onClick={handleDisplay}>Display paths</button>
                  <button onClick={handleSubmit}>Calcute shortest distance</button>
                </MDBListGroupItem>
              </MDBListGroup>
            </div>
          );
        } else if (p3 == 1) {
          return (
            <div>
              <MDBListGroup tag="div">
                <MDBListGroupItem
                  tag="a"
                  href="#"
                  action
                  active
                  aria-current="true"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <img src={Aicon} height="50" width="50"></img>
                    <img src={Bicon} height="50" width="50"></img>
                    <img src={Dicon} height="50" width="50"></img>
                    <img src={Cicon} height="50" width="50"></img>
                  </div>
                  <p className="  badge-success h2 ">
                    the shortest path possible in KM is {mini}
                  </p>
                  <input
                    type="text"
                    class="woocommerce-Input woocommerce-Input--text input-text form-control mywidth"
                    id="pathtitle"
                    value={pathtitle}
                    onChange={(e) => setPathtitle(e.target.value)}
                  />
                  <button onClick={handlePath}>Add path</button>
                  <button onClick={handleDisplay}>Display paths</button>
                  <button onClick={handleSubmit}>Calcute shortest distance</button>
                </MDBListGroupItem>
              </MDBListGroup>
            </div>
          );
        } else if (p4 == 1) {
          return (
            <div>
              <MDBListGroup tag="div">
                <MDBListGroupItem
                  tag="a"
                  href="#"
                  action
                  active
                  aria-current="true"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <img src={Aicon} height="50" width="50"></img>
                    <img src={Bicon} height="50" width="50"></img>
                    <img src={Cicon} height="50" width="50"></img>
                    <img src={Dicon} height="50" width="50"></img>
                  </div>
                  <br></br>
                  <p className="  badge-success h2 ">
                    the shortest path possible in KM is {mini}
                  </p>
                  <input
                    type="text"
                    class="woocommerce-Input woocommerce-Input--text input-text form-control mywidth"
                    id="pathtitle"
                    value={pathtitle}
                    onChange={(e) => setPathtitle(e.target.value)}
                  />
                  <button onClick={handlePath}>Add path</button>
                  <button onClick={handleDisplay}>Display paths</button>
                  <button onClick={handleSubmit}>Calcute shortest distance</button>
                </MDBListGroupItem>
              </MDBListGroup>
            </div>
          );
        } else if (p5 == 1) {
          return (
            <div>
              <MDBListGroup tag="div">
                <MDBListGroupItem
                  tag="a"
                  href="#"
                  action
                  active
                  aria-current="true"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <img src={Aicon} height="50" width="50"></img>
                    <img src={Cicon} height="50" width="50"></img>
                    <img src={Bicon} height="50" width="50"></img>
                    <img src={Dicon} height="50" width="50"></img>
                  </div>
                  <p className="  badge-success h2 ">
                    the shortest path possible in KM is {mini}
                  </p>
                  <input
                    type="text"
                    class="woocommerce-Input woocommerce-Input--text input-text form-control mywidth"
                    id="pathtitle"
                    value={pathtitle}
                    onChange={(e) => setPathtitle(e.target.value)}
                  />
                  <button onClick={handlePath}>Add path</button>
                  <button onClick={handleDisplay}>Display paths</button>
                  <button onClick={handleSubmit}>Calcute shortest distance</button>
                </MDBListGroupItem>
              </MDBListGroup>
            </div>
          );
        } else if (p6 == 1) {
          return (
            <div>
              <MDBListGroup tag="div">
                <MDBListGroupItem
                  tag="a"
                  href="#"
                  action
                  active
                  aria-current="true"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <img src={Aicon} height="50" width="50"></img>
                    <img src={Cicon} height="50" width="50"></img>
                    <img src={Dicon} height="50" width="50"></img>
                    <img src={Bicon} height="50" width="50"></img>
                  </div>
                  <p className="  badge-success h2 ">
                    the shortest path possible in KM is {mini}
                  </p>
                  <input
                    type="text"
                    class="woocommerce-Input woocommerce-Input--text input-text form-control mywidth"
                    id="pathtitle"
                    value={pathtitle}
                    onChange={(e) => setPathtitle(e.target.value)}
                  />
                  <button onClick={handlePath}>Add path</button>
                  <button onClick={handleDisplay}>Display paths</button>
                  <button onClick={handleSubmit}>Calcute shortest distance</button>
                </MDBListGroupItem>
              </MDBListGroup>
            </div>
          );
        } else {
          return (
            <div>
              <button onClick={handleSubmit}>Calcute shortest distance</button>
            </div>
          );
        }
      })()}
      <ul className="list-group">
        {paths.map((path) => {
          pathid.current=path._id;

          
          
           
           
          return (
            
            
            <div>
              
              <li className="list-group-item list-group-item-action list-group-item-success">
                Name :{path.title}
                <button type="button" class="btn btn-info m-2" data-mdb-ripple-color="dark" onClick={handleSelect}>Select</button>
                
                <button type="button" class="btn btn-outline-danger btn-rounded m-2" data-mdb-ripple-color="dark" onClick={handleDelete}>Delete</button>
              </li>
              <li className="list-group-item list-group-item-action list-group-item-light">
                Distance :{path.distance}{" "}
              </li>
              <li className="list-group-item list-group-item-action list-group-item-dark">
                Startingpositon: {APIMAPS.map((path1) => {
                   varlat1.current =path.points[0].lat;
                   varlng1.current =path.points[0].lng;
                   varlat2.current =path.points[1].lat;
                   varlng2.current =path.points[1].lng;
                   varlat3.current =path.points[2].lat;
                   varlng3.current =path.points[2].lng;
                   varlat4.current =path.points[3].lat;
                   varlng4.current =path.points[3].lng;
                  

          return (
            <div>
            {path1.place_name}
            </div>
          );
        })}
              </li>
            </div>
          );
        })}
      </ul>
    </div>

    /* <div>
      <MDBListGroup tag="div">
        <MDBListGroupItem tag="a" href="#" action active aria-current="true">
          <div className="d-flex w-100 justify-content-between">
            <img src={Aicon} height="50" width="50"></img>
            <img src={Bicon} height="50" width="50"></img>
            <img src={Cicon} height="50" width="50"></img>
            <img src={Dicon} height="50" width="50"></img>
          </div>
          <p className="mb-1">the shortest path possible in KM is {mini}</p>
          <small>Donec id elit non mi porta.</small>
        </MDBListGroupItem>
        <MDBListGroupItem tag="a" href="#" action>
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">List group item heading</h5>
            <small className="text-muted">3 days ago</small>
          </div>
          <p className="mb-1">
            Donec id elit non mi porta gravida at eget metus. Maecenas sed diam
            eget risus varius blandit.
          </p>
          <small className="text-muted">Donec id elit non mi porta.</small>
        </MDBListGroupItem>
        <MDBListGroupItem tag="a" href="#" action>
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">List group item heading</h5>
            <small className="text-muted">3 days ago</small>
          </div>
          <p className="mb-1">
            Donec id elit non mi porta gravida at eget metus. Maecenas sed diam
            eget risus varius blandit.
          </p>
          <small className="text-muted">Donec id elit non mi porta.</small>
        </MDBListGroupItem>
      </MDBListGroup>
      
    </div>*/
  );
}
export default History;
