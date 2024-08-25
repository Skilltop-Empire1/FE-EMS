import React, {useState} from 'react'
import style from './staffStyle.module.css'
import { CiCirclePlus } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";

const Staff = () => {

  const [showForm, setShowForm] = useState(false);

  // Step 2: Toggle form visibility when button is clicked
  const toggleForm = () => {
    setShowForm(!showForm);
    
  };

  return (
    <div className={style.body}>
      <div>
        <div className={style.top}>
        <h2 className={style.header}>Doctors</h2>
        <div className={style.sticky}>
         <button onClick={toggleForm} disabled={showForm} className={style.topIcon} >
          <CiCirclePlus />
         </button>
          <div className={style.staff}>Add staff</div>
        </div>
        </div>
      </div>
      <div className={style.info}>
        <div >
          <input type="text" placeholder='Name' className={style.filter}/> 
          <select name="Profession" id="filterText" className={style.filter}>
            <option value="Doctor">Select Specializtion</option>
            <option value="profession">Dentist</option>
            <option value="profession">Opthamologist</option>
            <option value="profession">Dermatologist</option>
          </select>
          <select name="Profession" id="filterText" className={style.filter}>
            <option value="Doctor">Select Practice</option>
            <option value="profession">Dentist</option>
            <option value="profession">Opthamologist</option>
            <option value="profession">Dermatologist</option>
          </select>
        </div>
        <table className={style.table}>
          <thead className={style.thead}>
            <tr>
              <th className={style.th}>Name</th>
              <th className={style.th}>Email</th>
              <th className={style.th}>Gender</th>
              <th className={style.th}>Mobile Number</th>
              <th className={style.th}>Practice</th>
              <th className={style.th}>Specialization</th>
              <th className={style.th}>Action</th>
            </tr>
          </thead>
          <tbody className={style.tbody}>
            <tr>
              <td className={style.td}>Parangeet</td>
              <td className={style.td}>Test@gmail.com</td>
              <td className={style.td}>Male</td>
              <td className={style.td}>+234Number</td>
              <td className={style.td}>prandk.zcj k</td>
              <td className={style.td}>prandk.zcj k</td>
              <td className={style.td}>
                <div className={style.mamaIcons}>
                  <div className={style.actionIcons}>
                    <FaEye />
                  </div >
                  <div className={style.actionIcons}>
                   <MdModeEditOutline />
                  </div>
                  <div className={style.actionIcons}>
                   <RiDeleteBinLine /> 
                  </div>
                </div>
              </td>
            </tr>
             <tr>
              <td className={style.td}>Parangeet</td>
              <td className={style.td}>Test@gmail.com</td>
              <td className={style.td}>Male</td>
              <td className={style.td}>+234Number</td>
              <td className={style.td}>prandk.zcj k</td>
              <td className={style.td}>prandk.zcj k</td>
              <td className={style.td}>
                <div className={style.mamaIcons}>
                  <div className={style.actionIcons}>
                    <FaEye />
                  </div >
                  <div className={style.actionIcons}>
                   <MdModeEditOutline />
                  </div>
                  <div className={style.actionIcons}>
                   <RiDeleteBinLine /> 
                  </div>
                </div>
              </td>
            </tr> 
            <tr>
              <td className={style.td}>Parangeet</td>
              <td className={style.td}>Test@gmail.com</td>
              <td className={style.td}>Male</td>
              <td className={style.td}>+234Number</td>
              <td className={style.td}>prandk.zcj k</td>
              <td className={style.td}>prandk.zcj k</td>
              <td className={style.td}>
                <div className={style.mamaIcons}>
                  <div className={style.actionIcons}>
                    <FaEye />
                  </div >
                  <div className={style.actionIcons}>
                   <MdModeEditOutline />
                  </div>
                  <div className={style.actionIcons}>
                   <RiDeleteBinLine /> 
                  </div>
                </div>
              </td>
            </tr> 
            <tr>
              <td className={style.td}>Parangeet</td>
              <td className={style.td}>Test@gmail.com</td>
              <td className={style.td}>Male</td>
              <td className={style.td}>+234Number</td>
              <td className={style.td}>prandk.zcj k</td>
              <td className={style.td}>prandk.zcj k</td>
              <td className={style.td}>
                <div className={style.mamaIcons}>
                  <div className={style.actionIcons}>
                    <FaEye />
                  </div >
                  <div className={style.actionIcons}>
                   <MdModeEditOutline />
                  </div>
                  <div className={style.actionIcons}>
                   <RiDeleteBinLine /> 
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      { showForm &&
        <div className={style.addInfo}>
            <div className={style.addInfoTop}>
              <h3>Doctors</h3>
              <button onClick={toggleForm} className={style.close}>X</button>
            </div>
            <form className={style.form}> 
              <div className={style.formChild}>
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name"  className={style.input}/>
              </div>
              <div className={style.formChild}>
                <label htmlFor="address">Address</label>
                <input type="text" id="address" name="address"  className={style.input} />
              </div>
              <div className={style.formChild}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" className={style.input}/>
              </div>
              <div className={style.formChild}>
                <label htmlFor="qualification">Educational Qualification</label>
                <input type="text" id="qualification" name="qualification"  className={style.input}/>
              </div>
              <div className={style.formChild}>
                <label htmlFor="number">Mobile Number</label>
                <input type="number" id="number" name="number"  className={style.input}/>
              </div>
              <div className={style.formChild}>
                <label htmlFor="specialization">Specialization</label>
                <input type="text" id="specialization" name="specialization"  className={style.input}/>
              </div>
              <div className={style.formChild}>
                <label htmlFor="gender">Gender</label>
                <input type="text" id="gender" name="gender"  className={style.input}/>
              </div>
              <div className={style.formChild}>
                <label htmlFor="practice">Practice</label>
                <input type="text" id="practice" name="practice"  className={style.input}/>
              </div>
              <div className={style.formChild}>
                <label htmlFor="date">Date Of Birth</label>
                <input type="date" id="date" name="date"  className={style.input}/>
              </div>
              <div className={style.formChild}>
                <label htmlFor="organization">Organization</label>
                <input type="text" id="organization" name="organization"  className={style.input}/>
              </div>
              <button type="submit" className={style.submit}>Save Staff</button>
            </form>
        </div>
      }
    </div>
  )
}

export default Staff

