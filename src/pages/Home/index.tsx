import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useState } from 'react'

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
  task: zod.string().min(1, 'Informe a tarefa'),
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

interface Cycle {
  id: string,
  task: string,
  minutesAmount: number
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null> (null)
  const [ amountSecondsPassed, setAmountSecondsPassed ] = useState(0)


  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,

    }
  })

  const id = String(new Date().getTime());

  function handleCreateNewCycle(data: NewCycleFormData){
    const newCycle: Cycle = {
      id: id,
      task: data.task,
      minutesAmount: data.minutesAmount,
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)

    reset();
  }

  // console.log(formState.errors)

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0 
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

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
            min={0} 
            max={60}
            {...register('minutesAmount', { valueAsNumber: true})}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24}/>
            Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}