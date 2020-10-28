import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: '#3f51b5',
    color: 'white',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

// 

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

// 

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function DataTable(props) {
  const classes = useStyles();

  function TableType() {
      if (props.type === "remove") {
          return <Button onClick={props.removeContactData} color="primary" variant="contained" size="small">Delete Me</Button>
      } else if (props.type === "add") {
          return <Checkbox onClick={props.selectContacts} />
      }
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Company</StyledTableCell>
            <StyledTableCell align="right">First Name</StyledTableCell>
            <StyledTableCell align="right">Last Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, index) => (
            <StyledTableRow key={index} id={row._id}>
              <StyledTableCell component="th" scope="row">
                {row.company}
              </StyledTableCell>
              <StyledTableCell align="right">{row.firstName}</StyledTableCell>
              <StyledTableCell align="right">{row.lastName}</StyledTableCell>
              <StyledTableCell align="center">{row.email}</StyledTableCell>
              <StyledTableCell>{TableType()}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}