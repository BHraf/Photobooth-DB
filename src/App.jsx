import React, { useState , useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import './App.css'
import { TableReviews } from "./Mantine/TableReviews";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { createTheme, MantineProvider , Button } from '@mantine/core';
import { StatsRing } from "./Mantine/StatsRing";
import  image from "./BAF.png";
import { InputTooltip } from "./Mantine/InputTooltip";
import { DateInput } from '@mantine/dates';
//const apiUrl = import.meta.env.VITE_API_URL;
//const apiKey = import.meta.env.VITE_API_KEY;


const theme = createTheme({
  colors: {
    'ocean-blue' : ['#7AD1DD', '#5FCCDB', '#44CADC', '#2AC9DE', '#1AC2D9', '#11B7CD', '#09ADC3', '#0E99AC', '#128797', '#147885'],
  },
});


function App() {
  const [afficher, setAff] = useState(false);
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  

  const [table, setTable]  = useState(null);
  const [net, setnew]  = useState(null);
  const [value, setValue] =useState(null);
  const [value1, setValue1] =useState(null);
  const supabase = createClient(
    'https://xnpnysxhokmbjlwlmmzs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhucG55c3hob2ttYmpsd2xtbXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5OTU5MTUsImV4cCI6MjA0OTU3MTkxNX0.KwOL_cXdaNADEnTrOhijyFemikb3rh2fJZWxIIu8L3Q'
  );

  function sumPrices(data) {
    return data.reduce((total, item) => {
      if (item.PRICE) {
        let prc = item.PRICE == "1.5" ? 1.5 : 2.5;
        return total + prc;
      }
      return total;
    }, 0);
  }

  function MaleCent(data) {
    let length = data.length;
    let male = 0;
  
    data.map((item, i) => {
      if (item.GENDER) {
        let prc = item.GENDER == "Male" ? 1 : 0;
        male = male + prc;
      }
    });
    let Bigger = length - 2 * male < 0;
    const result = (male * 100) / length;
  const formattedResult = result.toFixed(2);
    return formattedResult;
  }
  function getLastNumber(data) {
    if (data.length === 0) {
      return null; // Return null if the array is empty
    }
    return data[data.length - 1].NUMBER;
  }


  async function GettingData( email1 , mdp1 ) {

    const test =email; 
    const test1 = mdp.toString();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: test,
      password: test1,
    });
    if(data.user != null){
      const response = await supabase.from("Payment").select();

    setTable(response.data);
    setnew(response.data);
    setAff(true);
    setAuth(true);
    }
    else{
      console.log('tttdd')
    }
   /* const response = await supabase.from("Payment").select();
    console.log(response.error);
    console.log(response.data);
    setTable(response.data);
    setAff(true);*/

    
  }

  function filterByDate(vl) {
    setTable(net);

    if(value&&vl){
      const donn = net.filter((item) => {
        const itemTime = new Date(item.TIME);

        return (CompareDates(itemTime, value) && CompareDates(vl, itemTime) );
      });
      setTable(donn);
      setValue(null);
      setValue1(null)
    }
    
  }
  
  function CompareDates(itemTime, compareDate) {
    let x = itemTime.getFullYear();
    let y = compareDate.getFullYear();
    if (x > y) {
      return true;
    } else if (x < y) {
      return false;
    } else {
      x = itemTime.getMonth();
      y = compareDate.getMonth();
      if (x > y) {
        return true;
      } else if (x < y) {
        return false;
      } else {
        x = itemTime.getDate();
        y = compareDate.getDate();

        if (x >= y) {
          return true;
        } else if (x < y) {
          return false;
        }
      }
    }
  }

  useEffect(()=>{
    
  },[email, mdp])


  
  return (
    <div className="container">
      <MantineProvider theme={theme}>
      <div className="BackgroundImage">
      {
        !auth && 
          <div className="BgAll" style={{'width':'400px' , 'textAlign':'start'}}>
              <img className="ImageSize" src={image}></img>
              <InputTooltip setMdp={setMdp} email={email} setEmail={setEmail} />
            <div style={{'display':'flex' , 'justifyContent':'center' , 'alignItems': 'center' , 'height': '100px'}}>
            <Button fullWidth size="md" color="ocean-blue"
                onClick={()=> GettingData( email , mdp )}
            >
              Sign In
            </Button>
            </div>
          </div>
      }
    {auth && <div>
      <div className="bltrst">
      < StatsRing last={`${getLastNumber(table)}`} MaleCent={`${MaleCent(table)}`}  sumPrices={`${sumPrices(table)}`} />
    
    <div style={{'margin':'50px' , 'display' : 'flex', 'justifyContent': 'center'} }>
    <div style={{ 'display' : 'flex', 'justifyContent': 'center' , 'gap':'50px' } }> 
    <div style={{'width' :'300px' } }>
    <DateInput
    clearable={true}
      value={value}
      onChange={(vl) => {setValue(vl);
       
    } }
      label="Filter By Date"
      placeholder="from"
    />
    </div>
    <div style={{'width' :'300px' } }>
    <DateInput
        clearable={true}
      value={value1}
      onChange={(vl) => {setValue1(vl);
            filterByDate(vl)
    } }
    label="By selecting a range"
    placeholder="to"
    />
    </div>

    </div>
  
    </div></div>
    {
      afficher && <div className="Test_tables" >
        <div>
        <TableReviews data={table} />
        </div>
        </div>

    }
      </div>}</div>

    </MantineProvider>
    </div>
  )
}

export default App


/*
if(vl==null|| vl ==""){
          setTable(net);
        }
        else{
          filterByDate();
        }
function filterByDate(data, comparisonDate) {
  // Ensure the compareDate is a valid Date object

  // Filter data based on the TIME attribute
  const donn = data.filter((item) => {
    const itemTime = new Date(item.TIME);

    return CompareDates(itemTime, comparisonDate);
  });
  console.log(donn);
}

function CompareDates(itemTime, compareDate) {
  let x = itemTime.getFullYear();
  let y = compareDate.getFullYear();
  if (x > y) {
    return true;
  } else if (x < y) {
    return false;
  } else {
    x = itemTime.getMonth();
    y = compareDate.getMonth();
    if (x > y) {
      return true;
    } else if (x < y) {
      return false;
    } else {
      x = itemTime.getDay();
      y = compareDate.getDay();

      if (x >= y) {
        return true;
      } else if (x < y) {
        return false;
      }
    }
  }
}


const res = await supabase
    .from("Payment")
    .insert([
      {
        NUMBER: 6,
        PRICE: "1,5",
        GENDER: "Male",
        CHARACTER: "",
        TIME: new Date(),
        RESULT:
          "https://firebasestorage.googleapis.com/v0/b/photobooth-466c7.appspot.com/o/results%2Fimageh2EiOy724znLRkNP.png?alt=media&token=bdf0d9a9-5289-4685-aa43-b54b9decb0a9",
      },
    ])
    .select();

*/
