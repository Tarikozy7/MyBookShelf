import React from "react";

const BookCard = ({ bookInfo,handleModal,handleEditModal,handleRead }) => {
  //   console.log(props);

  const { title, date, isRead, id } = bookInfo;
  return (
    <div className="mt-5 d-flex justify-content-between align-items-center p-3 border rounded shadow">
      <div>
        <h5 style={{ textDecoration: isRead ? "line-through" : "none" }}>
          {title}
        </h5>
        <p>{date}</p>
      </div>

      <div className="btn-group">
        <button onClick={()=>handleModal(id)}className="btn btn-danger">Sil</button>

        <button onClick={()=>handleEditModal(bookInfo)} className="btn btn-primary">Düzenle</button>

        <button onClick={()=>handleRead(bookInfo)} className="btn btn-success">
          {isRead === true ? "Okundu" : "Okunmadı"}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
