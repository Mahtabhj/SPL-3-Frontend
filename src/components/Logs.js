import React from "react";
import { Accordion, Button, Dropdown, Table } from "react-bootstrap";
import { BsFillPlusCircleFill, BsThreeDotsVertical } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { Link, Navigate } from "react-router-dom";
import Header from "./Header";

const Logs = () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <div className="logs px-4 py-3">
        <div
          className="d-flex justify-content-between align-items-start px-2 py-3"
          style={{ background: "#f8f8f9" }}
        >
          <div>
            <h4 className="fw-bold logs-title">
              Well-Architected Framework Review Report
            </h4>
            <p>
              Search, group and customize Well-Architected Framework Review
              findings into a report you can download and share. <br />
              16/02/2023, 16:04:06
            </p>
          </div>

          <Button
            className="d-flex align-items-center gap-2 logs-custom-button"
            as={Link}
            to="/settings/manageAccount"
          >
            <BsFillPlusCircleFill />
            Custom Questions
          </Button>
        </div>
        <div className="d-flex justify-content-between">
          <div className="logs-filter h-100 p-3 ">
            <div className="search">
              <IoIosSearch className="search-icon" />
              <input
                type="text"
                className="form-control"
                placeholder="Search for anything.."
              />
            </div>
            <div className="filter-items px-3 py-2">
              <p className="fw-bold p-0 m-0">Cloud Accounts</p>
              <p className="p-0 m-0">None</p>
            </div>

            <div className="filter-items px-3 py-2">
              <p className="fw-bold p-0 m-0">Tags</p>
            </div>

            <div className="filter-items px-3 py-2">
              <p className="fw-bold p-0 m-0">Regions</p>
              <p className="p-0 m-0">None</p>
            </div>
          </div>

          <div className="logs-report  p-3">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>SECURITY PILLER</Accordion.Header>

                <Accordion.Body className="p-0">
                  <Table className="my-2 logs-table">
                    <thead className="table-header">
                      <tr>
                        <th className="py-3 col-7">Description</th>
                        <th className="py-3">FINDINGS</th>
                        <th className="py-3">PRIORITY</th>
                        <th className="py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <p className="fw-bold">
                            Monitoring resources for encryption at rest
                          </p>
                          <p>
                            Data at rest encryption ensures protecting data
                            that's not moving through networks. The protection
                            in this case is offered via encryption. nOps
                            provides Encryption at Rest status for resources
                            (EBS/RDS/S3).
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">Policy check for IAM users</p>
                          <p>
                            It's important to have information about IAM users
                            who have Directly attached policy, Inline Policies &
                            Admin Access Policies within your infrastructure.
                            This helps to protect your infrastructure from
                            unauthorized access. Also you have one centralized
                            documentation for all these users
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">
                            Implement life cycle, MFA and password policies for
                            all users
                          </p>
                          <p>
                            The current best practice is for customers to
                            segregate defined roles and responsibilities of
                            system users by creating user groups. User groups
                            can be defined using several different technologies:
                            Identity and Access Management (IAM) groups, IAM
                            roles for cross-account access, Web Identities, via
                            Security Assertion Markup Language (SAML)
                            integration (e.g., defining the roles in Active
                            Directory), or by using a third-party solution
                            (e.g., Okta, Ping Identity, or another custom
                            technique) which usually integrates via either SAML
                            or AWS Security Token Service (STS). Using a shared
                            account is strongly discouraged.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">Unrestricted Public Access</p>
                          <p>
                            The rule analyzes Virtual Private Cloud(VPC)
                            resources running in a public subnet with
                            0.0.0.0/[port number] in security groups. This
                            common mistake opens cloud networks to outside
                            threats.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">S3 Security Check</p>
                          <p>
                            The rule does below security & best practices checks
                            on S3 buckets. Mismanagement of S3 permissions
                            settings by users is one of most common causes of
                            security breaches and can cause significant data
                            leaks. A few of the important checks in S3 buckets
                            are: Knowing which public read and public write
                            access settings for S3 Bucket. Usage of S3
                            versioning to store and retrieve any particular data
                            element. Encryption of data at server side for S3.
                            Enabling logging to track what actions are performed
                            against your S3 buckets.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">AWS Config Check</p>
                          <p>
                            AWS Config provides a detailed view of the
                            configuration of AWS resources in your AWS account.
                            This rule checks whether AWS config is enabled in
                            your AWS account.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">Cloudtrail Check</p>
                          <p>Enable CloudTrail log file integrity validation</p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">Root MFA</p>
                          <p>
                            AWS strongly recommends that you do not use the root
                            user for your everyday tasks, even the
                            administrative ones. Instead, adhere to the best
                            practice of using the root user only to create your
                            first IAM user. Then securely lock away the root
                            user credentials and use them to perform only a few
                            account and service management tasks.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">Root account usage details</p>
                          <p>
                            This rule scans the workload and provides you with
                            details of the root account usage. It's strongly
                            recommended that you do not use the root user for
                            your everyday tasks, even the administrative ones.
                            Instead, adhere to the best practice of using the
                            root user only to create your first IAM user. Root
                            account should be used to perform only a few account
                            and service management tasks.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">Inactive keys</p>
                          <p>
                            It is highly recommended that you do not use keys
                            for provisioning resources.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">
                            Resources in Classic AWS VPC
                          </p>
                          <p>
                            AWS recommends that resources from AWS classic VPC
                            to be moved to AWS VPC. (EC2 Resources)
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">Amazon Guardduty check</p>
                          <p>
                            Consider Enabling GuardDuty intelligent threat
                            detection and continuous monitoring
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">
                            AWS web application firewall configuration
                          </p>
                          <p>
                            Consider attaching at least a resource to the AWS
                            WAF ACLs
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">
                            Amazon Inspector configuration
                          </p>
                          <p>
                            Consider configuring Amazon Inspector to improve the
                            security and compliance of your AWS resources
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">
                            Details of infrequently used IAM roles
                          </p>
                          <p>
                            Checks if there are IAM roles have not been used in
                            the past 90 days.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">Public EBS Snapshot</p>
                          <p>
                            EBS snapshots have public access enabled. Remove
                            public access to better protect the data.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">Root access key</p>
                          <p>
                            AWS Accounts have root access key and secret key
                            activated.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">AWS account password policy</p>
                          <p>
                            AWS accounts with no strong password policy
                            configuration was detected in all the AWS accounts.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">Cloudtrail s3 protection</p>
                          <p>
                            AWS accounts do not have the CloudTrail bucket
                            protected from deletion or overwrite.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">Admin Users</p>
                          <p>
                            Checks for users with Administrator Access policy.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">
                            CMK Unencrypted Lambda Variables
                          </p>
                          <p>
                            Checks if Lambda environment variables are encrypted
                            using CMK.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">Public Lambda Function</p>
                          <p>
                            Checks if the Lambda access policy allows public
                            invocation.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">Orphaned Lambda Function</p>
                          <p>
                            Checks for Lambda functions that don't have triggers
                            defined.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">VPC Flow Logging Disabled</p>
                          <p>Checks for VPCs without Flow Logging enabled.</p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">Public AMI</p>
                          <p>Checks for AMIs that are public.</p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">Public RDS Snapshot</p>
                          <p>Checks for RDS Snapshots that are public.</p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>COST PILLER</Accordion.Header>
                <Accordion.Body>
                  <Table className="my-2 logs-table">
                    <thead className="table-header">
                      <tr>
                        <th className="py-3 col-7">Description</th>
                        <th className="py-3">FINDINGS</th>
                        <th className="py-3">PRIORITY</th>
                        <th className="py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <p className="fw-bold">
                            Infrequently accessed S3 buckets
                          </p>
                          <p>
                            Consider lower cost storage options like infrequent
                            access, Glacier.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">
                            ECS cluster with underutilized resources
                          </p>
                          <p>
                            Review AWS ECS cluster(s) with EC2 Launch Type has
                            resources with below 10% utilization across cluster.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">
                            EFS cluster with underutilized resources
                          </p>
                          <p>
                            Consider enabling EFS Lifecycle Management on your
                            file system so that files not accessed according to
                            the lifecycle policy you choose will be
                            automatically and transparently moved into EFS IA
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">
                            S3 rightsizing recommendation
                          </p>
                          <p>
                            You may want to lower read/write capacity for S3
                            recommendation rightsizing or consider switching it
                            from Provisioned Mode to On-Demand Mode.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">
                            EC2 Instance rightsizing recommendation
                          </p>
                          <p>
                            You may want to lower read/write capacity for EC2
                            instance recommendation rightsizing or consider
                            switching it from Provisioned Mode to On-Demand
                            Mode.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">
                            RDS Instance rightsizing recommendation
                          </p>
                          <p>
                            You may want to lower read/write capacity for RDS
                            instance recommendation or consider switching it
                            from Provisioned Mode to On-Demand Mode.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">DynamoDB low utilization</p>
                          <p>
                            You may want to lower read/write capacity for these
                            tables or consider switching them from Provisioned
                            Mode to On-Demand Mode.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">
                            RDS Instance rightsizing recommendation
                          </p>
                          <p>
                            Consider setting a desirable log retention time for
                            these CloudWatch log groups to save money.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">IOPS performance Checks</p>
                          <p>
                            Provisioned IOPS are a new EBS volume type designed
                            to deliver predictable, high performance for I/O
                            intensive workloads, such as database applications,
                            that rely on consistent and fast response times.
                            Customers can then attach multiple volumes to an
                            Amazon EC2 instance and stripe across them to
                            deliver thousands of IOPS to their application.{" "}
                            <br />
                            Performance check helps to observe utilization and
                            likely cost saving you can achieve by fine tuning
                            it.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">Dynamodb throughput check</p>
                          <p>
                            Centralizes information about major Dynamodb
                            throughput usage across multiple AWS managed
                            services and it alerts.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">Unused resources in cloud</p>
                          <p>
                            With cloud, resources get launched when there is a
                            need. It’s important to turn off inactive or idle
                            resources or those unused resources can continue to
                            add cost to your workload. You can get realtime
                            notifications about unused resources from nOps.
                            EBS_Unattached - EBS_Stopped - EBS provides
                            persistent block storage volumes for use with Amazon
                            EC2 instances in the AWS Cloud. Without attachment
                            to a running EC2 instance, the EBS cost is more than
                            what it gives back. Consider using EBS Snapshot for
                            backup and storage on S3, and Amazon EFS for
                            low-frequency file access usage. EIP_Unused -
                            Elastic IPs are totally free, as long as they are
                            being used by an instance. Amazon will charge you
                            $0.005/hr for each EIP that you reserve and do not
                            use. If it is associated with a stopped instance or
                            an unattached network interface it will cost you.
                            EIP_Additional - If you have additional Elastic IP
                            addresses, ensure they are attached to a running
                            instance or else you will incur a per/hr. cost. ELB
                            - ELB with no EC2 instance running still costs
                            money. If you don’t have a plan to use these ELBs,
                            just delete them. NAT - The nOps uses NAT Gateway
                            metric BytesOutToDestination to list down NAT
                            gateways which are not being actively used for a
                            week. The user can review and terminate NAT gateways
                            which are not required and save the costs
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">
                            Manage under-utilized resources
                          </p>
                          <p>
                            Right-sizing your infrastructure is crucial to
                            ensure that cloud costs are in control. nOps
                            visibility into CPU utilization patterns (EC2, RDS)
                            helps to retire or re-engineer the existing servers.
                            Under-utilized infrastructure (Less than 30%, 20%,
                            10%) Zombie infrastructure
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">
                            EC2 low network traffic details
                          </p>
                          <p>
                            Review or terminate idle instances to save money.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">RDS instance idle</p>
                          <p>
                            Checks whether the average connections RDS instance
                            have been 0.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">
                            Unattached Workspace Directories
                          </p>
                          <p>
                            Checks whether workspace directory has any
                            workspaces attached.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>RELIABILITY PILLER</Accordion.Header>
                <Accordion.Body>
                  <Table className="my-2 logs-table">
                    <thead className="table-header">
                      <tr>
                        <th className="py-3 col-7">Description</th>
                        <th className="py-3">FINDINGS</th>
                        <th className="py-3">PRIORITY</th>
                        <th className="py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <p className="fw-bold">
                            Workload is resilient to availability zone
                            disruption
                          </p>
                          <p>
                            Each AWS region is a separate geographic area. Each
                            region has multiple, isolated locations known as
                            Availability Zones. Availability Zones is a
                            high-availability offering that protects your
                            applications and data from datacenter failures.
                            Amazon EC2 provides you the ability to place
                            resources, such as instances, and data in multiple
                            locations. Resources aren't replicated across
                            regions unless you do so specifically. <br />
                            The solution must continue to operate in the case
                            where all of the services within a single
                            availability zone have been disrupted
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">
                            EBS volumes without Snapshots
                          </p>
                          <p>
                            Depending on the type of workload, snapshotting EBS
                            volumes is required. This rule identifies EBS
                            volumes without Snapshots. The user can decide
                            either to enable snapshots or override this rule.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">DynamoDB Backup Check</p>
                          <p>
                            DynamoDB has a Point-in-time recovery feature, which
                            allows restoring the data to point in time. This
                            nOps checks if DynamoDB backup is enabled.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">
                            RDS resources with default backup policy details
                          </p>
                          <p>
                            If you don't set the backup retention period for
                            RDS, the default backup retention period is one day,
                            which is not a best practice. nOps shows RDS
                            resources with default backup policy where the
                            backup retention period is 1 day. <br />
                            The user can set their own backup retention period
                            for such resources.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">
                            Resources not part of any autoscaling group
                          </p>
                          <p>
                            These ec2 instances are not part of autoscaling
                            groups. Leverage autoscaling for high availability
                            and lower cost.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">Enable Multi-AZ for RDS</p>
                          <p>
                            RDS instances are enabled for Multi-AZ. It provides
                            high availability to quickly and automatically
                            recover from infrastructure failures.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">
                            Enable Multi-AZ for Elasticache
                          </p>
                          <p>
                            Elasticache instances are enabled for Multi-AZ. It
                            provides high availability to quickly and
                            automatically recover from infrastructure failures.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">S3 versioning enabled</p>
                          <p>
                            S3 bucket versioning allows you to easily recover
                            from unintended user actions and application
                            failures.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header>OPERATIONS PILLER</Accordion.Header>
                <Accordion.Body>
                  <Table className="my-2 logs-table">
                    <thead className="table-header">
                      <tr>
                        <th className="py-3 col-7">Description</th>
                        <th className="py-3">FINDINGS</th>
                        <th className="py-3">PRIORITY</th>
                        <th className="py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <p className="fw-bold">
                            AWS enterprise support disruption
                          </p>
                          <p>
                            AWS Enterprise Support is recommended production
                            and/or mission critical workloads.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">VPC CIDR</p>
                          <p>
                            VPC resources have overlapping CIDR. Avoid issues in
                            the VPC peering in the future and use
                            non-overlapping IP ranges.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">Resources without tags</p>
                          <p>
                            Amazon resources (EC2 / EBS) don’t have tags. Add
                            tags for better accountability.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">Schedules Events s</p>
                          <p>
                            Resources have scheduled maintenance events. Review
                            the resources to avoid service disruptions.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">Out of date AMI</p>
                          <p>
                            Checks for AMIs that are older than six months old.
                            These resources are likely missing important patches
                            and security updates required for reliable
                            operations.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>PERFORMANCE PILLER</Accordion.Header>
                <Accordion.Body>
                  <Table className="my-2 logs-table">
                    <thead className="table-header">
                      <tr>
                        <th className="py-3 col-7">Description</th>
                        <th className="py-3">FINDINGS</th>
                        <th className="py-3">PRIORITY</th>
                        <th className="py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <p className="fw-bold">
                            Redshift cluster nodes with suboptimal utilization
                          </p>
                          <p>
                            You may want to consider downgrading your Redshift
                            node type or decreasing number of nodes to save
                            money.
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="fw-bold">Unused resources in cloud</p>
                          <p>
                            With cloud, resources get launched when there is a
                            need. It’s important to turn off inactive or idle
                            resources or those unused resources can continue to
                            add cost to your workload. You can get realtime
                            notifications about unused resources from nOps.{" "}
                            <br />
                            <br /> EBS_Unattached - EBS_Stopped - EBS provides
                            persistent block storage volumes for use with Amazon
                            EC2 instances in the AWS Cloud. Without attachment
                            to a running EC2 instance, the EBS cost is more than
                            what it gives back. Consider using EBS Snapshot for
                            backup and storage on S3, and Amazon EFS for
                            low-frequency file access usage.
                            <br /> EIP_Unused - Elastic IPs are totally free, as
                            long as they are being used by an instance. Amazon
                            will charge you $0.005/hr for each EIP that you
                            reserve and do not use. If it is associated with a
                            stopped instance or an unattached network interface
                            it will cost you.
                            <br /> EIP_Additional - If you have additional
                            Elastic IP addresses, ensure they are attached to a
                            running instance or else you will incur a per/hr.
                            cost.
                            <br /> ELB - ELB with no EC2 instance running still
                            costs money. If you don’t have a plan to use these
                            ELBs, just delete them.
                            <br /> NAT - The nOps uses NAT Gateway metric
                            BytesOutToDestination to list down NAT gateways
                            which are not being actively used for a week. The
                            user can review and terminate NAT gateways which are
                            not required and save the costs
                          </p>
                        </td>
                        <td>0</td>
                        <td className="d-flex gap-1">
                          <img
                            src="images/green-checked.svg"
                            alt="Profile Picture"
                          />
                          well architected
                        </td>

                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id="dropdown-basic"
                            >
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit-priority">
                                Edit priority
                              </Dropdown.Item>
                              <Dropdown.Item href="#add-comments">
                                Add comments
                              </Dropdown.Item>
                              <Dropdown.Item href="#rules-details">
                                See rules details
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logs;
