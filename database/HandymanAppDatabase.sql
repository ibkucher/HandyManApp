create table Handyman (hId varchar(10), hName varchar(40), hAddressLine varchar(50), hCity varchar(20), hProvince varchar(2), hZipCode varchar(6), hNumber varchar(10), hEmail varchar(50), sId varchar(10), primary key (hId));
create table HomeOwner (oId varchar(10), oName varchar(40), oAddressLine varchar(50), oCity varchar(20), oProvince varchar(2), oZipCode varchar(6), oNumber varchar(10), oEmail varchar(50), primary key (oId));
create table Tasks (tId varchar(10),oId varchar(10), tName varchar(40), tDescription varchar(100), tAddressLine varchar(50), tCity varchar(20), tProvince varchar(2), tZipCode varchar(6), tDate date, tStatus varchar(1), primary key(tId));
create table Skills(sId varchar(10),sCategory varchar(20), sCertificate varchar(30), sDescription varchar(100) );

INSERT INTO Handyman(hId,hName, hAddressLine, hCity, hProvince, hZipcode, hNumber, hEmail, sId)
VALUES('h100000001','Ashley Freer', '22 Rochman blvd', 'Scarborough', 'ON', 'M1H1S5','6471234343','Ashfreer@gmail.com','s100000001');
INSERT INTO Handyman(hId,hName, hAddressLine, hCity, hProvince, hZipcode, hNumber, hEmail, sId)
VALUES('h100000002','James Mcdonald', '34 Progress Ave', 'Scarborough', 'ON', 'M1H1S8','6471234554','Jammac@gmail.com','s100000002');

INSERT INTO HomeOwner(oId, oName, oAddressLine, oCity, oProvince, oZipcode, oNumber, oEmail)
VALUES('o100000001','Taylor Freer', '30 Progress Ave', 'Scarborough', 'ON', 'M1H1S2', '6474325464', 'tayfree@gmail.com' );
INSERT INTO HomeOwner(oId, oName, oAddressLine, oCity, oProvince, oZipcode, oNumber, oEmail)
VALUES('o100000002','Hailey Adams', '35 Rochman blvd', 'Scarborough', 'ON', 'M1H1S6', '6478734464', 'Haiadams@gmail.com' );

INSERT INTO Tasks(tId, oId, tName, tDescription, tAddressLine, tCity, tProvince, tZipcode, tDate, tStatus)
VALUES('t100000001','o100000001', 'Color','color kitchen cabinets', '30 Progress Ave', 'Scarborough', 'ON', 'M1H1S2', sysdate(), 'U');
INSERT INTO Tasks(tId, oId, tName, tDescription, tAddressLine, tCity, tProvince, tZipcode, tDate, tStatus)
VALUES('t100000002','o100000002', 'Electric','Fix washroom lights', '12 ellesmere rd', 'Scarborough', 'ON', 'M1H5S2', sysdate(), 'A');

INSERT INTO Skills(sId, sCategory, sCertificate, sDescription)
VALUES('s100000001','Electrician', 'Certified','Best Electrician in Ontario');
INSERT INTO Skills(sId, sCategory, sCertificate, sDescription)
VALUES('s100000002','Plumber', 'Certified','Best plumbing in Ontario');




