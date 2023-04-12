import { Play } from 'phosphor-react'

import { 
  CountdownContainer, 
  FormContainer, 
  HomeContainer, 
  Separator, 
  StartCountdownButton, 
  TaskInput, 
  MinutesAmountInput 
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task"> Vou estar </label>
          <TaskInput id="task" list="taskSugestions" placeholder='Nomeie sua tarefa...'/>
          
          <datalist id="taskSugestions">
            <option value="trabalhando 💼" />
            <option value="estudando React ⚛️" />
            <option value="jogando xadrez ♟️" />
          </datalist>

          <label htmlFor="minutesAmount"> durante </label>
          <MinutesAmountInput 
            type="number" 
            placeholder='00' 
            id="minutesAmout" 
            step={5}
            min={0} 
            max={60}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit">
            <Play size={24}/>
            Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}