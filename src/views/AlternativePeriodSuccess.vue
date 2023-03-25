<template>
  <div class="root">
    <div class="databox">
      <a href="/"><img src="../assets/loancalc_logo.png"></a>
      <h1 class="congrats">Congratulations!</h1>
      <p>You're initial needs could not be met due to our requirements. However, we could grant you a minimum loan
      of 2000€ with a payment period of</p>
      <h1 class="period">{{ minimumLoanPeriod }}</h1>
      <p>months</p>
      <div v-if="desiredLoanperiod >= 12 && desiredLoanperiod <= 60" class="ifDesiredLoan">
        <p>Your initial loan of <b>{{ loanAmount }}€</b> could be granted with a payment period of</p>
        <h1 class="period">{{ desiredLoanperiod }}</h1>
        <p>months</p>
      </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "AlternativePeriodSuccess",

  data(){
    return{
      loanAmount: this.$route.params.loansum,
      minimumLoanPeriod: this.$route.params.minimumloanperiod,
      desiredLoanperiod: this.$route.params.desiredloanperiod

    }

  }

}
</script>

<style scoped>

.congrats{
  color: #8CC7A1;
}
h1{
  margin-top: 3px;
  margin-bottom: 3px;
  text-align: center;
}

.period{
  margin-bottom: -15px;
}



.root{
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Helvetica, serif;
  letter-spacing: -0.5px;
}

.databox{
  border-radius:3px;
  border: 2px solid #2A0A55;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5%;
  margin: 0.5%;

}

p{
  text-align: center;
  margin-bottom: 15px;
}

img{
  margin-top: 30px;
  margin-bottom: 30px;
}

</style>