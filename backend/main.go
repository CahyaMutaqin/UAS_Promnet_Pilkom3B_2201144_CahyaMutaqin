package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

type Report struct {
	ID          string `json:"id"`
	Date        string `json:"date"`
	Description string `json:"description"`
	Amount      string `json:"amount"`
	Status      string `json:"status"`
	Receiver    string `json:"receiver"`
	JK          string `json:"jk"`
	NoTelp      string `json:"no_telp"`
	Address     string `json:"address"`
}

var db *sql.DB
var err error

func main() {
	InitDB()
	defer db.Close()
	Routers()
}

func Routers() {
	log.Println("Starting the HTTP server on port 9080")
	router := mux.NewRouter()
	router.HandleFunc("/api/reports", GetReports).Methods("GET")
	router.HandleFunc("/api/reports", CreateReport).Methods("POST")
	router.HandleFunc("/api/reports/{id}", GetReport).Methods("GET")
	router.HandleFunc("/api/reports/{id}", UpdateReport).Methods("PUT")
	router.HandleFunc("/api/reports/{id}", DeleteReport).Methods("DELETE")
	http.ListenAndServe(":9080", &CORSRouterDecorator{router})
}

// InitDB initializes the database connection
func InitDB() {
	db, err = sql.Open("mysql", "root:@tcp(127.0.0.1:3306)/db_2201144_cahya_mutaqin_uas_pilkomb")
	if err != nil {
		panic(err.Error())
	}
}

// GetReports retrieves all reports from the database
func GetReports(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var reports []Report

	result, err := db.Query("SELECT id, date, description, amount, status, receiver, jk, no_telp, address FROM transaksi_keuangan_cahya_mutaqin")
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()

	for result.Next() {
		var report Report
		err := result.Scan(&report.ID, &report.Date, &report.Description, &report.Amount, &report.Status, &report.Receiver, &report.JK, &report.NoTelp, &report.Address)
		if err != nil {
			panic(err.Error())
		}
		reports = append(reports, report)
	}

	json.NewEncoder(w).Encode(reports)
}

// CreateReport adds a new report to the database
func CreateReport(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	stmt, err := db.Prepare("INSERT INTO transaksi_keuangan_cahya_mutaqin(date, description, amount, status, receiver, jk, no_telp, address) VALUES(?, ?, ?, ?, ?, ?, ?, ?)")
	if err != nil {
		panic(err.Error())
	}

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}

	var report Report
	err = json.Unmarshal(body, &report)
	if err != nil {
		panic(err.Error())
	}

	_, err = stmt.Exec(report.Date, report.Description, report.Amount, report.Status, report.Receiver, report.JK, report.NoTelp, report.Address)
	if err != nil {
		panic(err.Error())
	}

	fmt.Fprintf(w, "New report was created")
}

// GetReport retrieves a specific report by ID from the database
func GetReport(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	result, err := db.Query("SELECT id, date, description, amount, status, receiver, jk, no_telp, address FROM transaksi_keuangan_cahya_mutaqin WHERE id = ?", params["id"])
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()

	var report Report
	for result.Next() {
		err := result.Scan(&report.ID, &report.Date, &report.Description, &report.Amount, &report.Status, &report.Receiver, &report.JK, &report.NoTelp, &report.Address)
		if err != nil {
			panic(err.Error())
		}
	}

	json.NewEncoder(w).Encode(report)
}

// UpdateReport updates a specific report in the database
func UpdateReport(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("UPDATE transaksi_keuangan_cahya_mutaqin SET date=?, description=?, amount=?, status=?, receiver=?, jk=?, no_telp=?, address=? WHERE id = ?")
	if err != nil {
		panic(err.Error())
	}

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}

	var report Report
	err = json.Unmarshal(body, &report)
	if err != nil {
		panic(err.Error())
	}

	_, err = stmt.Exec(report.Date, report.Description, report.Amount, report.Status, report.Receiver, report.JK, report.NoTelp, report.Address, params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Report with ID = %s was updated", params["id"])
}

// DeleteReport deletes a specific report from the database
func DeleteReport(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("DELETE FROM transaksi_keuangan_cahya_mutaqin WHERE id = ?")
	if err != nil {
		panic(err.Error())
	}

	_, err = stmt.Exec(params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Report with ID = %s was deleted", params["id"])
}

// CORSRouterDecorator applies CORS headers to a mux.Router
type CORSRouterDecorator struct {
	R *mux.Router
}

func (c *CORSRouterDecorator) ServeHTTP(rw http.ResponseWriter, req *http.Request) {
	if origin := req.Header.Get("Origin"); origin != "" {
		rw.Header().Set("Access-Control-Allow-Origin", origin)
		rw.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		rw.Header().Set("Access-Control-Allow-Headers", "Accept, Accept-Language, Content-Type, YourOwnHeader")
	}
	// Stop here if it's a Preflighted OPTIONS request
	if req.Method == "OPTIONS" {
		return
	}

	c.R.ServeHTTP(rw, req)
}