<!DOCTYPE html>

<html>
	<body>

		Thank you for your order! You ordered:<br>

		<?php echo $_GET['quan0'] . " Chicken Chop Suey,<br>";
		echo $_GET['quan1'] . " Sweet and Sour Pork,<br>";
		echo $_GET['quan2'] . " Shrimp Lo Mein,<br>";
		echo $_GET['quan3'] . " Moo Shi Chicken, and<br>";
		echo $_GET['quan4'] . " Fried Rice.<br><br>";

		?>

		Subtotal: <?php echo "$" . $_GET["subtotal"]; ?>
		<br>Mass Tax (6.25%): <?php echo "$" . $_GET["tax"]; ?> 
		<br>Total: <?php echo "$" . $_GET["total"]; ?>

		<?php
			$p_or_d = $_GET["p_or_d"];

			echo "DELIVERY OR PICKUP: " . $p_or_d;


		?>


		<?php
		date_default_timezone_set("America/New_York");
		echo "The time is " . date("i");
		?>
	</body>
</html>

