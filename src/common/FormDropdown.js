import React, { Component, useState }    from 'react';
//import Select from 'react-select';

const FLAVOURS = [
  { label: 'Chocolate', value: 'chocolate' },
  { label: 'Vanilla', value: 'vanilla' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Caramel', value: 'caramel' },
  { label: 'Cookies and Cream', value: 'cookiescream' },
  { label: 'Peppermint', value: 'peppermint' },
];

const WHY_WOULD_YOU = [
  { label: 'Chocolate (are you crazy?)', value: 'chocolate', disabled: true },
].concat(FLAVOURS.slice(1));

console.log("WHY_WOULD_YOU",WHY_WOULD_YOU)
const FromDropdown = (props) => {
const [state , setState] = useState( {
  value     : [],
  inputValue: '',
  options   : FLAVOURS,
  disabled: false,
  crazy: false,
});
  

  const handleSelectChange =  (value) => {
    console.log('You\'ve selected:', value);
    setState({ value });
  }

  const toggleDisabled = (e) => {
    console.log("--------",e);
    setState({ disabled: e.target.checked });
  }

  const toggleChocolate = (e) => {
    let crazy = e.target.checked;
    console.log(e,"--------");
    setState({
      crazy: crazy,
      options: crazy ? WHY_WOULD_YOU : FLAVOURS,
    });
  }

  console.log(state);

    return (
      <div></div>
      // <div className="form-group col-md-6">
      //   <label className="col-sm-12 lable">{props.label}</label>
      //   <div className="col-sm-12">
      //       <Select
      //             multi
      //             simpleValue
      //             disabled={state.disabled}
      //             value={state.value}
      //             placeholder="Select your favourite(s)"
      //             options={state.options}
      //             onChange={()=>handleSelectChange()}
      //         />
      //       <div className="checkbox-list">
      //           <label className="checkbox">
      //           <input
      //               type="checkbox"
      //               className="checkbox-control"
      //               checked={state.disabled}
      //               onChange={()=>toggleDisabled()}
      //           />
      //         </label>
      //         <label className="checkbox">
      //           <input
      //               type="checkbox"
      //               className="checkbox-control"
      //               checked={state.crazy}
      //               onChange={()=>toggleChocolate()}
      //           />
      //         </label>
      //       </div>
      //     </div>
      //   </div>
    )
}

export default FromDropdown;
