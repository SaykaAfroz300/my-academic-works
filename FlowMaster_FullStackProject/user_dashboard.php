<?php
    session_start();
    if(isset($_SESSION['email'])){
    include('includes\connection.php');
    if(isset($_POST['submit_leave'])){
        $query="insert into leaves values(null,$_SESSION[uid],'$_POST[subject]','$_POST[message]','No Action')";
        $query_run=mysqli_query($connection,$query);
        if($query_run){
            echo "<script type='text/javascript'>
            alert('Form submitted succesfully...');
            window.location.href = 'user_dashboard.php';
            </script>
            ";
        }
        else{
            echo "<script type='text/javascript'>
            alert('Error...Please try again.');
            window.location.href = 'user_dashboard.php';
            </script>
            ";
        }
    }

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User dashboard page</title>
    <!-- jQuery file -->
    <script src="includes\jquery_latest.js"></script>
    <!-- Bootstrap files -->
    <link rel="stylesheet" type="text/css" href="bootstrap\css\bootstrap.min.css">
    <script src="bootstrap\js\bootstrap.min.js"></script>
    <!-- External CSS files -->
    <link rel="stylesheet" type="text/css" href="css\styles.css">
    <script type="text/javascript">
        $(document).ready(function(){
            $("#manage_task").click(function(){
                $("#right_sidebar").load("task.php");
            });
        });

        $(document).ready(function(){
            $("#apply_leave").click(function(){
                $("#right_sidebar").load("leaveForm.php");
            });
        });

        $(document).ready(function(){
            $("#leave_status").click(function(){
                $("#right_sidebar").load("leave_status.php");
            });
        });
    </script>
</head>
<body>
    <!-- Header code starts here -->
    <div class="row" id="header">
        <div class="col-md-12">
            <div class="col-md-4" style="display: inline-block;">
                <h3>FlowMaster</h3>
            </div>
            <div class="col-md-6" style="display: inline-block; text-align: right; color:rgb(251, 248, 250)">
                <b>Email: </b> <?php echo $_SESSION['email']; ?>
                <span style="margin-left: 25px; color:rgb(251, 248, 250)"><b>Name: </b><?php echo $_SESSION['name']; ?></span>
            </div>
        </div>
    </div>
    <!-- Header code ends here -->
    <div class="row">
        <div class="col-md-2" id="left_sidebar">
            <table class="table">
                <tr>
                    <td style="text-align: center;">
                        <a href="user_dashboard.php" type="button" id="logout_link">Dashboard</a>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: center;">
                        <a type="button" class="link" id="manage_task">Task Progress</a>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: center;">
                        <a type="button" class="link" id="apply_leave">Request Time Off</a>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: center;">
                        <a type="button" class="link" id="leave_status">Leave Tracker</a>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: center;">
                        <a href="logout.php" type="button" id="logout_link">Logout</a>
                    </td>
                </tr>
            </table>
        </div>
        <div class="col-md-10" id="right_sidebar">
            <h4>🏢 Workplace Code of Conduct</h4>
            <ul style="line-height: 3em;font-size: 1.2em;list-style-type:none">
                <li>🕧Daily Attendance: All employees are required to record their attendance without fail each working day.</li>
                <li>🕧Task Completion: Timely completion of assigned tasks is expected from every team member..</li>
                <li>🕧Professional Conduct: Maintain a respectful and professional environment within the office premises.</li>
                <li>🕧Cleanliness: Ensure your workspace and common office areas remain tidy and organized.</li>
            </ul>

        </div>
    </div>
</body>
</html>
<?php
}
else(
    header('Location:user_login.php')
)
?>