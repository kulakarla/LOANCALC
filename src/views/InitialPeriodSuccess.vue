<template>
  <div class="root">
    <div class="databox">
      <a href="/"><img src="../assets/loancalc_logo.png"></a>
      <h1 class="congrats">Congratulations!</h1>
      <p>You are deemed fit for a loan up to</p>
      <h1>{{ loanAmount }}€</h1>
      <p>with a payment period of</p>
      <h1 class="period"> {{ loanPeriod }} </h1>
      <p>months</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "InitialPeriodSuccess",

  data(){
    return{
      loanAmount: this.$route.params.loansum,
      loanPeriod: this.$route.params.period

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