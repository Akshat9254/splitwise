import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React from "react";

const Table = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Payer</TableCell>
            <TableCell align="center">Payee</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Add</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow
              key={`${transaction.payer}#${transaction.payee}#${transaction.amount}`}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell align="center">
                <Typography>{transaction.payer}</Typography>
              </TableCell>

              <TableCell align="center">
                <Typography>{transaction.payee}</Typography>
              </TableCell>

              <TableCell align="center">
                <Typography>{transaction.amount}</Typography>
              </TableCell>
            </TableRow>
          ))}

          <TransactionInput
            newTransaction={newTransaction}
            setNewTranaction={setNewTranaction}
            users={users}
            setTransactions={setTransactions}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Table;
