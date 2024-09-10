import React, { useEffect, useState } from "react";
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import {
Chart,
PieSeries,
Title
} from '@devexpress/dx-react-chart-material-ui';


const App = () => {

// Catogories data
const data = [
{ argument:'Monday', value:10 },
{ argument:'Tuesday', value:40 },
{ argument:'Wednesday', value:10 },
{ argument:'Thursday', value:20 },
{ argument:'Friday', value:20 },
];
return (
	<Paper>
	<Chart
	data={data}
	>
	<PieSeries valueField="value" argumentField="argument" />
	<Title text="Sales by Catogories"/>
	</Chart>
</Paper>
);
}

export default App;
