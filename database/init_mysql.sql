CREATE DATABASE IF NOT EXISTS accident_prediction;

USE accident_prediction;

CREATE TABLE camera (
  cameraName varchar(255) NOT NULL,
  description varchar(255) DEFAULT NULL,
  address varchar(255) NOT NULL,
  location varchar(255) DEFAULT NULL,
  cameraId varchar(255) NOT NULL,
  PRIMARY KEY (cameraId)
);

CREATE TABLE prediction (
  predictionId varchar(255) NOT NULL,
  cameraId varchar(255) NOT NULL,
  imageURL varchar(255) NOT NULL,
  accident varchar(45) NOT NULL,
  nonaccident varchar(45) DEFAULT NULL,
  sec int DEFAULT NULL,
  timestamp int DEFAULT NULL,
  PRIMARY KEY (predictionId),
  KEY `cameraId_idx` (cameraId),
  CONSTRAINT `cameraId` FOREIGN KEY (cameraId) REFERENCES camera (cameraId) ON DELETE CASCADE
);
