import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '../assets/styles/home.styles'
import { COLORS } from '../constants/colors'
const BalanceCard = ({summary}) => {
  return (
    <View style={styles.balanceCard}>
     <Text style={styles.balanceTitle}>Total Balance</Text>
    <Text style={[styles.balanceAmount ]}> ₹ {parseFloat(summary.balance).toFixed(2)} </Text>
    <View style={styles.balanceStats}>
<View style={styles.balanceStatItem}>
<Text style={[styles.balanceStatLabel,{color:COLORS.income,fontSize:14}]}>Income</Text>
<Text style={[styles.balanceStatAmount, {color:"green"}]}>
    +₹ {parseFloat(summary.income).toFixed(2)}
</Text>
</View>
<View style={[styles.balanceStatItem , styles.statDivider]} />
<View style={styles.balanceStatItem}>
<Text style={[styles.balanceStatLabel,{color:COLORS.expense,fontSize:14}]}>Expenses</Text>
<Text style={[styles.balanceStatAmount,{color:"red"}]}>
-₹ {Math.abs(parseFloat(summary.expense)).toFixed(2)}
</Text>
</View>

    </View>
    </View>
  )
}

export default BalanceCard