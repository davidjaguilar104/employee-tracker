function viewDepartments() {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
      if(err) throw err;
  
      console.table(rows);
      promptUserChoices();
    })
  }