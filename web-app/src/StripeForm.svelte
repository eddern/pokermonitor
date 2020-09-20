<script>
	import { loadStripe } from '@stripe/stripe-js';
</script>

<style>
	container {
		position: absolute;
		right: 0;
		bottom: 0;
		padding: 20px;
		background: #ddd;
	}
</style>

<container>
	<form id="payment-form">
		<div id="card-element">
			<!--Stripe.js injects the Card Element-->
		</div>
		<button id="submit">
			<div class="spinner hidden" id="spinner" />
			<span id="button-text">Pay</span>
		</button>
		<p id="card-error" role="alert" />
		<p class="result-message hidden">
			Payment succeeded, see the result in your
			<a href="" target="_blank">Stripe dashboard.</a>
			Refresh the page to pay again.
		</p>
	</form>
</container>
