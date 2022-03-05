import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};




export default function FormDropdownWithCheckbox(props) {

    const names = [
        'Product',
        'Customer',
        'Payment',
        'Store',
    ];
    console.log("props",props);
    const [personName, setPersonName] = React.useState([]);

    React.useEffect(()=>{
        setPersonName([props.value]);
    },[props.value]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        props.selectData(event.target.value);
    };
    return (
        <div className="form-group col-md-6">
            <FormControl sx={{ m: 1, width: "100%" }}>
                <InputLabel id="demo-multiple-checkbox-label">{props.label}</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    name="accessModuleId"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label={props.label} />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={personName.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
