import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { 
  CountdownContainer, 
  FormContainer, 
  HomeContainer, 
  Separator, 
  StartCountdownButton, 
  TaskInput, 
  MinutesAmountInput 
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1,'Informe a tarefa'),
  minutesAmount: 
    zod
      .number()
      .min(1, 'O ciclo precisa ser de no minímo 1 minuto')
      .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

interface NewCycleFormData {
  task: string,
  minutesAmount: number,
}

export function Home() {
  const { register, handleSubmit, watch, formState } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 5,

    }
  })

  function handleCreateNewCycle(data: NewCycleFormData){
    console.log(data)
  }

  // console.log(formState.errors)

  const task = watch('task')

  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task"> Vou estar </label>
          <TaskInput 
            id="task"
            list="taskSugestions" 
            placeholder='Nomeie sua tarefa...'
            {...register('task')}
          />

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
            {...register('minutesAmount', { valueAsNumber: true})}
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

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24}/>
            Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}