import React, {useState, useEffect} from 'react'
import { Markup } from 'interweave'
import fake from '../data.json'
import './Card.css'
import { Base64 } from 'aws-sdk/clients/ecr'

export default function Card(props: any) {
  const [key, setKey] = useState<any>()
  const [value, setValue] = useState<any[]>([])
  let datas = props

  const parse = (table: any) => {
    let cle = Object.keys(table); 
    let out = ""
    for(let one of cle){
      out+=`\n${one} : ${table[one]}`
    }
  return out
  }
  
const lenght = (tableLength: any) => {
  let cle = Object.keys(tableLength[0]);
  let out = "<table><tbody><tr>"
    for(let one of cle){
      out+=`<td class='titre'> ${one}</td>`
    }
    out += "</tr>"
    for(let i=0; i<tableLength.length; i++){
      out += "<tr class='tab'>"
      for(let one of cle){
        out += `<td>${tableLength[i][one]}</td>`
      }
      out += "</tr>"
    } 
    
    return out+="</tbody></table>"
}

const mapData = (data: any)=>{
  let tableKey = []
  let tableValue = []
  let index = Object.keys(data[0])
  for(let item of index){
    tableKey.push(item)
      if(typeof(data[0][item]) == 'number'){
        tableValue.push((data[0][item]));
      }else if(data[0][item].length){
         tableValue.push(lenght(data[0][item]))
      }else{
        tableValue.push(parse((data[0][item])));
      }
  }
  setKey(tableKey);
  setValue(tableValue)
}

useEffect(()=>{
  if(datas){
    mapData(fake);
  }
}, [datas])

  return (
    <>
      <table className='container'>
        <tbody>
          {value.map((elt: any, index: number)=>(
            <tr key={index} className='bar'>
              <th className='bar'>{key[index]}</th>
              <td className='content '><Markup content={(elt).toString()}/></td>
            </tr>
          ))}
        </tbody>
        </table>        
    </>
  )
}
