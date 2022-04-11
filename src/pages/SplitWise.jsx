import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Graph } from "react-d3-graph";
import simplifyTransactions from "../utils/settlePayment";

const TransactionInput = ({
  newTransaction,
  setNewTranaction,
  users,
  setTransactions,
}) => {
  const handleChange = (e) => {
    setNewTranaction((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addTransaction = () => {
    setTransactions((prev) => [...prev, newTransaction]);
    setNewTranaction({ payer: "", payee: "", amount: 0 });
  };

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell align="center">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Payer</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={newTransaction.payer}
            label="Age"
            name="payer"
            onChange={handleChange}
          >
            {users.map((user) => (
              <MenuItem key={user} value={user}>
                {user}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>

      <TableCell align="center">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Payer</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={newTransaction.payee}
            label="Age"
            name="payee"
            onChange={handleChange}
          >
            {users
              .filter((user) => user !== newTransaction.payer)
              .map((user) => (
                <MenuItem key={user} value={user}>
                  {user}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </TableCell>

      <TableCell align="center">
        <TextField
          variant={"standard"}
          placeholder={"Enter Amount"}
          type={"number"}
          name="amount"
          value={newTransaction.amount}
          onChange={handleChange}
        />
      </TableCell>

      <TableCell align="center">
        <Button variant={"outlined"} onClick={addTransaction}>
          Add
        </Button>
      </TableCell>
    </TableRow>
  );
};

const SplitWise = ({ users }) => {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTranaction] = useState({
    payer: "",
    payee: "",
    amount: 0,
  });
  const [showInitialGraph, setShowInitialGraph] = useState(false);
  const [initialGraphData, setInitialGraphData] = useState({});
  const [initialGraphConfig, setInitialGraphConfig] = useState({});

  const [showSimplifiedGraph, setShowSimplifiedGraph] = useState(false);
  const [simplifiedGraphData, setSimplifiedGraphData] = useState({});
  const [simplifiedGraphConfig, setSimplifiedGraphConfig] = useState({});

  const [simplifiedTransactions, setSimplifiedTransactions] = useState([]);

  const buildInitialGraph = () => {
    setInitialGraphData({
      nodes: users.map((user) => ({ id: user })),
      links: transactions.map((transaction) => ({
        source: transaction.payer,
        target: transaction.payee,
        amount: transaction.amount,
      })),
    });

    setInitialGraphConfig({
      nodeHighlightBehavior: true,
      node: {
        color: "lightgreen",
        fontSize: 16,
        highlightFontSize: 18,
        size: 120,
        highlightStrokeColor: "blue",
      },
      link: {
        highlightColor: "lightblue",
        renderLabel: true,
        fontSize: 12,
        labelProperty: "amount",
      },
      directed: true,
    });

    setShowInitialGraph(true);
  };

  const buildSimplifiedGraph = () => {
    const output = simplifyTransactions(transactions);
    setSimplifiedTransactions(output);

    setSimplifiedGraphData({
      nodes: users.map((user) => ({ id: user })),
      links: output.map((transaction) => ({
        source: transaction.payer,
        target: transaction.payee,
        amount: transaction.amount,
      })),
    });

    setSimplifiedGraphConfig({
      nodeHighlightBehavior: true,
      node: {
        color: "lightgreen",
        fontSize: 16,
        highlightFontSize: 18,
        size: 120,
        highlightStrokeColor: "blue",
      },
      link: {
        highlightColor: "lightblue",
        renderLabel: true,
        fontSize: 12,
        labelProperty: "amount",
      },
      directed: true,
    });

    setShowSimplifiedGraph(true);
  };

  useEffect(() => {
    document
      .getElementById("simplifiedTransactions")
      .scrollIntoView({ behavior: "smooth" });
  }, [showSimplifiedGraph]);

  return (
    <>
      <Grid container paddingX={2} columnSpacing={4}>
        <Grid item xs={12} md={6} id="initialTransactions">
          <Grid container>
            <Grid item xs={12}>
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
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  marginTop: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Button variant="contained" onClick={buildInitialGraph}>
                  Build Graph
                </Button>
                <Button variant="contained" onClick={buildSimplifiedGraph}>
                  Simplify Transactions
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          {showInitialGraph && (
            <Graph
              id="graph-id" // id is mandatory
              data={initialGraphData}
              config={initialGraphConfig}
              onZoomChange={() => {}}
            />
          )}
        </Grid>

        {/* simplified graph */}
        <Grid item xs={12} md={6} id="simplifiedTransactions">
          {showSimplifiedGraph && simplifiedTransactions.length && (
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h4" gutterBottom align="center">
                  Simplified Transaction
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Payer</TableCell>
                        <TableCell align="center">Payee</TableCell>
                        <TableCell align="center">Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {simplifiedTransactions.map((transaction) => (
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
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          {showSimplifiedGraph && simplifiedTransactions.length && (
            <Graph
              id="graph-id1" // id is mandatory
              data={simplifiedGraphData}
              config={simplifiedGraphConfig}
              onZoomChange={() => {}}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};


export default SplitWise;
