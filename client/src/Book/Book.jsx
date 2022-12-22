import React, { useContext, useEffect, useState } from 'react'
import Header from '../Header/Header'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import "./book.scss"
import { context } from '../Context';
import axios from 'axios';
function Book() {
    let { users, isSignedIn ,signinValue,fetchUsers,setUsers} = useContext(context)
    let findUser = users.find((user) => user.email === signinValue.email);

  let [foundUserState, setFoundUserState] = useState(findUser);
    let [bookValue, setBookValue] = useState({
        date: "",
        time: "",
        persons:1
    })
    console.log("🚀 ~ file: Book.jsx:20 ~ Book ~ bookValue", bookValue)
    let handlePlus = () => {
        if (bookValue.persons > 15) {
            return;
        } else {
            setBookValue({...bookValue,persons:bookValue.persons + 1})
            
        }
    }

    let handleMinus = () => {
        if (bookValue.persons < 2) {
            return;
        } else {
            setBookValue({...bookValue,persons:bookValue.persons - 1})
            
        }
    }

    let personsOrPerson = bookValue.persons === 1 ? "Person" : "Persons"

    let filterBooked = users.filter(item => item?.book?.date === bookValue?.date)
    console.log("🚀 ~ file: Book.jsx:13 ~ Book ~ bookValue", bookValue)
    // let thisDay = filterBooked.some(item => item.book.date === bookValue?.date)

    let handleSubmit = async (e) => {
        e.preventDefault()
        if (isSignedIn === true) {
            setFoundUserState({...foundUserState,book:bookValue})
            await axios.put(`http://localhost:4000/pushBook/${foundUserState._id}`, bookValue)
            alert("Your booking is successfully done")
            setBookValue({
                date: "",
                time: "",
                persons:1
            })
    fetchUsers().then((result) => setUsers(result));
    setFoundUserState(findUser);
        } else {
            alert("Please Sign in !")
        }
       
    }
    useEffect(() => {
        setFoundUserState(findUser);
      }, [users]);
    
  return (
      <div className='book_'>
          <Header />
          <div className="book_container">
              <form onSubmit={handleSubmit}>
                  <h1>Reserve a table</h1>
                  <h2> {bookValue?.date || bookValue?.time !== "" ? `You are booking in ${bookValue?.date} at ${bookValue?.time}, ${bookValue.persons} ${personsOrPerson} ` : ""}</h2>
                  <div className="form_container">
                     {/* =================================== Date ======================== */}
                     <div className="date">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          orientation="protrait"
          openTo="day"
          classNames='datePicker'
          // value={dateNow}
          
          disablePast
          onChange={(newvalue) => 
            setBookValue({...bookValue,date:[newvalue?.$y,newvalue?.$M + 1,newvalue?.$D].join("-")})
          }
                
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
                  </div>
                  {/* ======================================= Time ======================= */}
                      {bookValue?.date !== "" && (
                           <div className="time">
                           {/* ============= */}
                           <label htmlFor="8">
                               <h3>08:00</h3>
                           <input  onChange={(e) => setBookValue({...bookValue,time:e.target.value})} disabled={filterBooked?.some(item => item?.book?.time === "8:00")} type="radio" name="time" id="8" value="08:00" />
                           </label>
                           {/* ============= */}
                           <label htmlFor="9">
                               <h3>09:00</h3>
                           <input onChange={(e) => setBookValue({...bookValue,time:e.target.value})} disabled={filterBooked?.some(item => item?.book?.time === "9:00")} type="radio" name="time" id="9" value="09:00" />
                           </label>
                           {/* ============= */}
                           <label htmlFor="10">
                               <h3>10:00</h3>
                           <input onChange={(e) => setBookValue({...bookValue,time:e.target.value})} disabled={filterBooked?.some(item => item?.book?.time === "10:00")} type="radio" name="time" id="10" value="10:00" />
                           </label>
                           {/* ============= */}
                           <label htmlFor="11">
                               <h3>11:00</h3>
                           <input onChange={(e) => setBookValue({...bookValue,time:e.target.value})} disabled={filterBooked?.some(item => item?.book?.time === "11:00")} type="radio" name="time" id="11" value="11:00" />
                           </label>
                           {/* ============= */}
                           <label htmlFor="12">
                               <h3>12:00</h3>
                           <input onChange={(e) => setBookValue({...bookValue,time:e.target.value})} disabled={filterBooked?.some(item => item?.book?.time === "12:00")} type="radio" name="time" id="12" value="12:00" />
                           </label>
                           {/* ============= */}
                           <label htmlFor="13">
                               <h3>13:00</h3>
                           <input onChange={(e) => setBookValue({...bookValue,time:e.target.value})} disabled={filterBooked?.some(item => item?.book?.time === "13:00")} type="radio" name="time" id="13" value="13:00" />
                           </label>
                           {/* ============= */}
                           <label htmlFor="14">
                               <h3>14:00</h3>
                           <input onChange={(e) => setBookValue({...bookValue,time:e.target.value})} disabled={filterBooked?.some(item => item?.book?.time === "14:00")} type="radio" name="time" id="14" value="14:00" />
                           </label>
                           {/* ============= */}
                           <label htmlFor="15">
                               <h3>15:00</h3>
                           <input onChange={(e) => setBookValue({...bookValue,time:e.target.value})} disabled={filterBooked?.some(item => item?.book?.time === "15:00")} type="radio" name="time" id="15" value="15:00" />
                           </label>
                           {/* ============= */}
                           <label htmlFor="16">
                               <h3>16:00</h3>
                           <input onChange={(e) => setBookValue({...bookValue,time:e.target.value})} disabled={filterBooked?.some(item => item?.book?.time === "16:00")} type="radio" name="time" id="16" value="16:00" />
                           </label>
                           {/* ============= */}
                           <label htmlFor="17">
                               <h3>17:00</h3>
                           <input onChange={(e) => setBookValue({...bookValue,time:e.target.value})} disabled={filterBooked?.some(item => item?.book?.time === "17:00")} type="radio" name="time" id="17" value="17:00" />
                           </label>
                           {/* ============= */}
                           <label htmlFor="18">
                               <h3>18:00</h3>
                           <input onChange={(e) => setBookValue({...bookValue,time:e.target.value})} disabled={filterBooked?.some(item => item?.book?.time === "18:00")} type="radio" name="time" id="18" value="18:00" />
                           </label>
                           {/* ============= */}
                           <label htmlFor="19">
                               <h3>19:00</h3>
                           <input onChange={(e) => setBookValue({...bookValue,time:e.target.value})} disabled={filterBooked?.some(item => item?.book?.time === "19:00")} type="radio" name="time" id="19" value="19:00" />
                           </label>
                           {/* ============= */}
                           <label htmlFor="20">
                               <h3>20:00</h3>
                           <input onChange={(e) => setBookValue({...bookValue,time:e.target.value})} disabled={filterBooked?.some(item => item?.book?.time === "20:00")} type="radio" name="time" id="20" value="20:00" />
                           </label>
                           {/* ============= */}
                           <label htmlFor="21">
                               <h3>21:00</h3>
                           <input onChange={(e) => setBookValue({...bookValue,time:e.target.value})} disabled={filterBooked?.some(item => item?.book?.time === "21:00")} type="radio" name="time" id="21" value="21:00" />
                           </label>
                           {/* ============= */}
                           <label htmlFor="22">
                               <h3>22:00</h3>
                           <input onChange={(e) => setBookValue({...bookValue,time:e.target.value})} disabled={filterBooked?.some(item => item?.book?.time === "22:00")} type="radio" name="time" id="22" value="22:00" />
                              </label>
                              {/* ============================ Persons ================ */}
                              <label htmlFor="persons">
                                  <h3 className='h3Persons'>Persons</h3>
                                  <div className="btns_persons">
                                      <h6 onClick={handleMinus}>-</h6>
                                      <h4>{ bookValue.persons}</h4>
                                      <h6 onClick={handlePlus}>+</h6>
                                  </div>
                              </label>
                       </div>
                      )}
                  </div>
                  <button className='submitBtn' disabled={isSignedIn === false}>{ isSignedIn === true ? "Book" : "Please Sign in"}</button>
              </form>
          </div>
    </div>
  )
}

export default Book