/*
SPDX-License-Identifier: Apache-2.0
*/

package main

import (
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract provides functions for managing a car
type SmartContract struct {
	contractapi.Contract
}

// Car describes basic details of what makes up a car
type Drug struct {
	DrugName  string `json:"drug"`
	Timestamp string `json:"timestamp"`
	Holder  string `json:"holder"`
	Location  string `json:"location"`
}

// QueryResult structure used for handling result of query
type QueryResult struct {
	Id    string `json:"Id"`
	Record *Drug
}

// InitLedger adds a base set of cars to the ledger
func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	drugs := []Drug{
		Drug{DrugName: "Crocin", Timestamp: "12-12-12", Holder: "SunPharma", Location:"Pune"},
		Drug{DrugName: "Neocirtizine", Timestamp: "13-04-20", Holder: "Fortis", Location:"Delhi"},
	}

	for i, drug := range drugs {
		drugAsBytes, _ := json.Marshal(drug)
		err := ctx.GetStub().PutState(strconv.Itoa(i), drugAsBytes)

		if err != nil {
			return fmt.Errorf("Failed to put to world state. %s", err.Error())
		}
	}

	return nil
}

// CreateCar adds a new car to the world state with given details
func (s *SmartContract) CreateDrug(ctx contractapi.TransactionContextInterface, drugNumber string, drugname string, timestamp string, holder string, location string) error {
	drug := Drug{
		DrugName:  drugname,
		Timestamp: timestamp,
		Holder:  holder,
		Location: location,
	}

	drugAsBytes, _ := json.Marshal(drug)

	return ctx.GetStub().PutState(drugNumber, drugAsBytes)
}

// QueryCar returns the car stored in the world state with given id
func (s *SmartContract) QueryDrug(ctx contractapi.TransactionContextInterface, drugNumber string) (*Drug, error) {
	drugAsBytes, err := ctx.GetStub().GetState(drugNumber)

	if err != nil {
		return nil, fmt.Errorf("Failed to read from world state. %s", err.Error())
	}

	if drugAsBytes == nil {
		return nil, fmt.Errorf("%s does not exist", drugNumber)
	}

	drug := new(Drug)
	_ = json.Unmarshal(drugAsBytes, drug)

	return drug, nil
}

// QueryAllCars returns all cars found in world state
func (s *SmartContract) QueryAllDrugs(ctx contractapi.TransactionContextInterface) ([]QueryResult, error) {
	startId := ""
	endId := ""

	resultsIterator, err := ctx.GetStub().GetStateByRange(startId, endId)

	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	results := []QueryResult{}

	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()

		if err != nil {
			return nil, err
		}

		drug := new(Drug)
		_ = json.Unmarshal(queryResponse.Value, drug)

		queryResult := QueryResult{Id: queryResponse.Key, Record: drug}
		results = append(results, queryResult)
	}

	return results, nil
}

// ChangeCarOwner updates the owner field of car with given id in world state
func (s *SmartContract) ChangeDrugOwner(ctx contractapi.TransactionContextInterface, drugNumber string, newHolder string) error {
	drug, err := s.QueryDrug(ctx, drugNumber)

	if err != nil {
		return err
	}

	drug.Holder = newHolder

	drugAsBytes, _ := json.Marshal(drug)

	return ctx.GetStub().PutState(drugNumber, drugAsBytes)
}

func (s *SmartContract) ChangeDrugLocation(ctx contractapi.TransactionContextInterface, drugNumber string, newLocation string) error {
	drug, err := s.QueryDrug(ctx, drugNumber)

	if err != nil {
		return err
	}

	drug.Location = newLocation

	drugAsBytes, _ := json.Marshal(drug)

	return ctx.GetStub().PutState(drugNumber, drugAsBytes)
}

func main() {

	chaincode, err := contractapi.NewChaincode(new(SmartContract))

	if err != nil {
		fmt.Printf("Error create fabcar chaincode: %s", err.Error())
		return
	}

	if err := chaincode.Start(); err != nil {
		fmt.Printf("Error starting fabcar chaincode: %s", err.Error())
	}
}
