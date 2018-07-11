--
-- PostgreSQL database dump
--

-- Dumped from database version 10.4
-- Dumped by pg_dump version 10.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: CAMERA; Type: TABLE; Schema: public; Owner: luodina
--

CREATE TABLE public."CAMERA" (
    "_ID" uuid NOT NULL,
    "NAME" character(32) NOT NULL,
    "LOCATION" character(32) NOT NULL,
    "RTSP" character(32) NOT NULL,
    "RTSPRT" character(32) NOT NULL,
    "STATUS" boolean NOT NULL,
    "REMARKS" character(32),
    "TASK_ID" character(32),
    "CREATE_DATE" timestamp with time zone,
    "DEL_DATE" timestamp with time zone
);


ALTER TABLE public."CAMERA" OWNER TO luodina;

--
-- Name: REG_PEOPLE; Type: TABLE; Schema: public; Owner: luodina
--

CREATE TABLE public."REG_PEOPLE" (
    "_ID" uuid NOT NULL,
    "PERSONNAME" character(32) NOT NULL,
    "ALTNAME" character(32) NOT NULL,
    "SEX" character(1) NOT NULL,
    "NATIONALITY" character(32) NOT NULL,
    "REMARKS" character(100) NOT NULL,
    "NAME" character(32) NOT NULL,
    "IMAGE" bytea NOT NULL,
    "IMAGEID" character(32) NOT NULL,
    "PERSONID" character(32) NOT NULL,
    "FEATURE" bytea NOT NULL,
    "CREATE_DATE" timestamp with time zone NOT NULL,
    "UPDATE_DATE" timestamp with time zone
);


ALTER TABLE public."REG_PEOPLE" OWNER TO luodina;

--
-- Name: RESULT; Type: TABLE; Schema: public; Owner: luodina
--

CREATE TABLE public."RESULT" (
    "_ID" uuid NOT NULL,
    "TASK_ID" character(32) NOT NULL,
    "IMAGE_ID" character(32),
    "IMAGE_URL" character(32),
    "IMAGE_HEIGHT" integer,
    "IMAGE_WIDTH" integer,
    "IMAGE_FILE" bytea,
    "SIMILARITY" double precision,
    "QUALITY_SCORE" double precision,
    "IMAGE_MODE" integer,
    "TYPE" integer,
    "TRACKIDX" character(32),
    "CREATE_DATE" timestamp with time zone,
    "UPDATE_DATE" timestamp with time zone
);


ALTER TABLE public."RESULT" OWNER TO luodina;

--
-- Name: USERS; Type: TABLE; Schema: public; Owner: luodina
--

CREATE TABLE public."USERS" (
    "_ID" character(32) NOT NULL,
    "NAME" character(64) NOT NULL,
    "PASSWORD" character(32) DEFAULT ''::bpchar NOT NULL,
    "ROLE" character(32) DEFAULT 'user'::bpchar NOT NULL
);


ALTER TABLE public."USERS" OWNER TO luodina;

--
-- Name: CAMERA CAMERA_pkey; Type: CONSTRAINT; Schema: public; Owner: luodina
--

ALTER TABLE ONLY public."CAMERA"
    ADD CONSTRAINT "CAMERA_pkey" PRIMARY KEY ("_ID");


--
-- Name: REG_PEOPLE REG_PEOPLE_pkey; Type: CONSTRAINT; Schema: public; Owner: luodina
--

ALTER TABLE ONLY public."REG_PEOPLE"
    ADD CONSTRAINT "REG_PEOPLE_pkey" PRIMARY KEY ("_ID");


--
-- Name: RESULT RESULT_pkey; Type: CONSTRAINT; Schema: public; Owner: luodina
--

ALTER TABLE ONLY public."RESULT"
    ADD CONSTRAINT "RESULT_pkey" PRIMARY KEY ("_ID");


--
-- Name: USERS USERS_pkey; Type: CONSTRAINT; Schema: public; Owner: luodina
--

ALTER TABLE ONLY public."USERS"
    ADD CONSTRAINT "USERS_pkey" PRIMARY KEY ("_ID");


--
-- PostgreSQL database dump complete
--

