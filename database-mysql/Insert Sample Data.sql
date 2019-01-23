
INSERT INTO `attendance_system`.`company`
(`company_id`,`name`,`description`)
VALUES
(1,'Amiseq','Working worldwide in IT Staffing and Cyber Security');

INSERT INTO `attendance_system`.`branch`
(`branch_id`,`company_id`,`name`,`country`,`state`,`city`,`address`)
VALUES
(1,1,'Amiseq Inc.','USA','California','Milpitas',''), (2,1,'Amiseq Pune','India','Maharashtra','Pune','');

INSERT INTO `attendance_system`.`designation`
(`designation_id`,`name`,`description`)
VALUES
(1,'SVP', ''), (2, 'HR Manager',''),(3, 'Payroll Manager',''),
(4,'Recruitment Manager',''), (5, 'Recruitment Lead',''), (6, 'Recruitment Executive',''),(7, 'Sr. Recruiting Specialist',''),
(8, 'Technical Expert',''), (9, 'Account Manager','');


select * from employee;
INSERT INTO `attendance_system`.`employee`
(`employee_id`,`parent_employee_id`,`designation_id`,`branch_id`,`level`,`username`,`password`,`firstname`,`lastname`)
VALUES
(1,null,1,1,'/','admin','admin','Nilesh','Jadhav'),(2,1,2,1,'/1/','hr','hr','Himani','Pandey'),(3,1,3,1,'/2/','ac','ac','Accountent1','Surname1'),
(4,1,4,2,'/3/','kumar','kumar','Kumar','Saurabh'),(5,4,5,2,'/3/1/','rachit','rachit','Rachit','Shukla'), (6,4,6,2,'/3/2/','jeet','jeet','Jeet','Singh'), (7,4,7,2,'/3/3/','garv','garv','Garv','Gangawala'), (8,1,8,2,'/4/','manish','manish','Manish','Sijaria');



DELETE FROM `attendance_system`.`employee`;
DELETE FROM `attendance_system`.`branch`;
DELETE FROM `attendance_system`.`company`;
DELETE FROM `attendance_system`.`designation`;


DROP table `attendance_system`.`employee`;
DROP table `attendance_system`.`branch`;
DROP table `attendance_system`.`company`;
DROP table  `attendance_system`.`designation`;

select branch.country, branch.city, branch.name as branch_name, designation.name as designation_name, 
		employee.employee_id, concat(employee.firstname, ' ', employee.lastname) as name, employee.username,
        employee.level, employee.parent_employee_id
from employee, branch, designation 
where employee.branch_id = branch.branch_id and
	  employee.designation_id = designation.designation_id;

CAll `attendance_system`.`populate_calander`('2019-01-01','2019-12-31', @o_error,@o_no);
select @o_error, @o_no;
