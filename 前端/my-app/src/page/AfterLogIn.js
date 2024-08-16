import { Button, Divider } from "antd";
import { useEffect, useRef, useState } from "react";
import "../iconfont/iconfont.css";
import "../App.css";
import classNames from "classnames";
import axios from "axios";
import { uesSearchParams, useSearchParams } from "react-router-dom";

function AfterLogIn() {
  const [params] = useSearchParams();
  const account = params.get("account");
  // console.log(account);
  const password = params.get("password");
  const today = new Date();
  const todayNum = today.getTime();
  const [commentList, setCommentList] = useState([]);
  const [text, setText] = useState("");
  const [date, setDate] = useState("");

  const [flag, setFlag] = useState(false);
  let id = 0;
  // axios({url:'http://localhost:80'}).then(result=>{
  //   console.log(result.data);
  //   setCommentList(result.data);
  // })

  useEffect(() => {
    localStorage.setItem("token", account);
    axios
      .get("http://localhost:80/AfterLogIn", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          account: account,
          password: password,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCommentList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handlPublish = () => {
    if (date !== "" && text !== "") {
      let id = Math.floor(Math.random() * 100000);
      setCommentList([
        ...commentList,
        {
          item: text,
          date: date,
          id: id,
          check: false,
        },
      ]);
      setFlag(true);
      const formData = {
        text: text,
        date: date,
        id: id,
      };
      axios
        .post("http://localhost:80/AfterLogIn", formData,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        })
        .then((response) => {
          console.log("uccessful:", response.data);
          alert("添加成功");
        })
        .catch((error) => {
          console.error("Error registering:", error);
          alert("后端数据库添加失败");
        });
    } else {
      alert("输错了");
    }
    setText("");
    setDate("");
  };

  function Item({ item, date, did }) {
    const timestamp = new Date(date).getTime();
    const [acheck, setCheck] = useState(false);

    const handlDel = (did) => {
      console.log(did);
      if (acheck === true) {
        axios
          .delete(`http://localhost:80/AfterLogIn/delete/${did}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: {
              account: account,
              password: password,
            },
          })
          .then((response) => {
            setCommentList(commentList.filter((item) => item.id !== did));
            if (commentList.length === 1) setFlag(false);
          })
          .catch((error) => {
            console.error("删除数据时出错:", error);
          });
      }
    };

    const changeCheck = () => {
      if (acheck) {
        setCheck(false);
      } else {
        setCheck(true);
      }
    };

    return (
      <div className="incident">
        <div
          className={classNames(
            { in_font: acheck === false && timestamp < todayNum },
            { in_font_normal: acheck === false && timestamp >= todayNum },
            { check_font: acheck === true },
          )}
        >
          <p>{item}</p>
          <p>{date}</p>
        </div>
        <div className="left">
          <input type="checkbox" onChange={changeCheck}></input>
          <button
            className="delete iconfont icon-ashbin"
            onClick={() => handlDel(did)}
          ></button>
        </div>
      </div>
    );
  }
  console.log(text);
  console.log(date);
  return (
    <div className="App">
      <div className="userName" style={{ border: "2px" }}>
        用户名
      </div>
      <Button href="http://localhost:3000" type="primary" className="logIn">
        登出
      </Button>
      <h1 className="title">To Do List</h1>
      <div className="input_block">
        <input
          type="text"
          className="input_first"
          placeholder="输入任务名称"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></input>
      </div>

      <div className="input_block">
        <input
          type="date"
          className="input_second"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        ></input>
        <Button
          type="primary"
          className="button_add"
          style={{ paddingRight: "40px" }}
          onClick={handlPublish}
        >
          添加
        </Button>
      </div>

      <div className={classNames("body", { body_active: flag === false })}>
        {commentList.map((item) => (
          <Item key={item.id} item={item.item} date={item.date} did={item.id} />
        ))}
      </div>
    </div>
  );
}

export default AfterLogIn;
