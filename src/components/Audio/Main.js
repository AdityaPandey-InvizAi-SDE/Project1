import React,{useState,useEffect} from 'react'
import ReactPaginate from 'react-paginate'
import { useAuth } from '../Auth/auth';
export default function Main() {
  const auth =useAuth()
    const [items, setItems] = useState([]);
    const [data1, setdata1] = useState([]);
    let limit = 10;
    let userData=""
    useEffect(() => {
      userData= localStorage.getItem('Users')
      console.log(userData)
      const getComments = async () => {
        const res = await fetch(
          `http://localhost:8080/api/words/list?page=1&limit=${limit}`,{
            headers:{
              'x-access-token':userData,
            }
          }
     
        );
        const data = await res.json();
        // const total = res.headers.get("x-total-count");
        // setpageCount(Math.ceil(total / limit));
        // console.log(Math.ceil(total/12));
        console.log(data)
        setItems(data);
      };
  
      getComments();
    }, [limit]);
  
    const fetchComments = async (currentPage) => {
      const res = await fetch(
        `http://localhost:3004/comments?_page=${currentPage}&_limit=${limit}`,{
          headers:{
            'x-access-token':userData,
          }
        }
     
      );
      const data = await res.json();
      return data;
    };
    const handlePageClick = async (data) => {
        console.log(data.selected);
    
        let currentPage = data.selected + 1;
    
        const commentsFormServer = await fetchComments(currentPage);
    
        setItems(commentsFormServer);
        // setdata1(items.data)
        // scroll to the top
        //window.scrollTo(0, 0)

      };
      
        
      
       
      console.log(data1) 
  return (
    <div>
            <div >
              welcom{auth.user}
    {/* {
      data1.map((item,key)=>{
        return <p key={key}>ii</p>
      })
    } */}

      </div>
        <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"---"}
        pageCount={25}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
        />


    </div>
  )
}
