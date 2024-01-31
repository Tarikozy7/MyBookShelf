import { useState } from "react";
import Header from "./component/Header";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import BookCard from "./component/BookCard/BookCard";
import DeleteModal from "./component/DeleteModal/DeleteModal";
import EditModal from "./component/EditModal/EditModal";

function App() {
  // yeni kitabına adının tutulduğu state
  const [bookName, setBookName] = useState("");

  // tüm kitap verilerinin tutulduğu state
  const [books, stateBooks] = useState([]);
  const [showDeleteModoal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteTitle, setDeleteTitle] = useState("");
  const [editItem, setEditItem] = useState({});
  // inputun içeriğini almak için fonksiyon
  // input her değiştiğinde çalışır
  const handleChange = (e) => {
    // console.log(e.target.value);
    setBookName(e.target.value);
  };

  // console.log('Statedeki kitap',bookName);

  // kitap ekleme fonksiyonu
  const handleSubmit = (e) => {
    // formun varasayılan yenileme özelliği gibi temel özellikelrini kapat
    e.preventDefault();
    // console.log('form fonksiyonu');

    //  eğer kitap ismi yok, input boş ise
    if (!bookName) {
      //  mesaj gösterme işlevi
      toast.warn("Lütfen Kitap İsmi Giriniz...", { autoClose: 2000 });

      // fonksiyonun aşağıya devam etmesini engelledik
      return;
    }

    // yeni bir kitap oluşturma objesi
    const newBook = {
      id: v4(),
      title: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    };
    // console.log(date);
    // console.log('yeni kitap objesi', newBook);

    // seperate operatör yardımı ile state içinde bulunan
    // tüm kitapları dizi içine aktardık daha sonra
    // üstüne yeni oluşturduğumuz kitabı ekledik
    stateBooks([...books, newBook]);

    toast.success("Okunacak Bir Kitap Daha!", { autoClose: 2000 });
    // ekleme işlemi bitince inputun içini temizleme
    setBookName("");
  };
  // console.log(('kitaplar dizisi', books));

  const handleModal = (deleteBookId, deleteBookTitle) => {
    setDeleteId(deleteBookId);
    setDeleteTitle(deleteBookTitle);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    // console.log('delete fonksiyon')

    const filteredBooks = books.filter((book) => book.id !== deleteId);
    // console.log(filteredBooks);

    stateBooks(filteredBooks);
    setShowDeleteModal(false);

    toast.error("Sildik Gitti!", { autoClose: 2000 });
  };
  const handleEditModal = (editBook) => {
    // console.log("düzenleme modalı");
    setEditItem(editBook);
    setShowEditModal(true);
    // console.log(editBook);
  };


  const handleEditBook=()=>{
    // console.log('edit fonksiyonu');


    const editIndex=books.findIndex((book)=>book.id===editItem.id)
    const cloneBooks=[...books]
    cloneBooks.splice(editIndex,1,editItem)
    stateBooks(cloneBooks)
    setShowEditModal(false)
    toast.info('Kitap Adı Güncellendi',{autoClose:2000})

  }

  //Kitabı okundu olarak işaretleme
  const handleRead=(readBook)=>{
    // console.log('read fonksiyonu');
    // console.log(readBook);

    // Objenin okundu değerini tersine çevirme
    const updateBook={...readBook,isRead:!readBook.isRead}
    console.log(updateBook);

    const index=books.findIndex((book)=>book.id === readBook.id)
    const cloneBook=[...books]
    cloneBook[index]=updateBook
    stateBooks(cloneBook)
    toast.warning('Kitap Okundu Bilgisi Güncellendi',{autoClose:2000})
  }


  return (
    <div>
      <Header />

      <div className="Container">
        <form
          className="d-flex  justify-content-center gap-3 mt-4 rounded"
          onSubmit={handleSubmit}
        >
          <input
            value={bookName}
            onChange={handleChange}
            placeholder="Bir Kitap İsmi Giriniz..."
            className="form-control rounded  shadow"
            type="text"
          />
          <button className="btn btn-warning shadow">Ekle</button>
        </form>


        {/* eğer kitap dizim boş ise  */}
        {books.length === 0 ? (
          <h4 className="text-center mt-5">Henüz Bir Kitap İsmi Girmediniz</h4>
        ) : (
          // kitap dizimde eleman varsa
          books.map((book) => (
            <BookCard
              handleEditModal={handleEditModal}
              handleModal={handleModal}
              bookInfo={book}
              key={bookName.id}
              handleRead={handleRead}
            />
          ))
        )}
      </div>
      {showDeleteModoal && (
        <DeleteModal
          bookTitle={deleteTitle}
          handleDelete={handleDelete}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}

      {showEditModal && <EditModal
      handleEditBook={handleEditBook}
      
      editItem={editItem}
      setEditItem={setEditItem}
      setShowEditModal={setShowEditModal} />}
    </div>
  );
}

export default App;
