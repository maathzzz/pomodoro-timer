import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import ptBR from 'date-fns/locale/pt-BR'
import { CyclesContext } from "../../contexts/CyclesContext";
import { formatDistanceToNow } from "date-fns";

export function History() {
    const { cycles } = useContext(CyclesContext)

    return (
        <HistoryContainer>
            <center><h1> Meu histórico </h1> </center>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th> Tarefa </th>
                            <th> Duração </th>
                            <th> Início </th>
                            <th> Status </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles.map(cycle =>{
                            return (
                                <tr key={cycle.id}>
                                    <td>{cycle.task}</td>
                                    <td>{cycle.minutesAmount} minutos</td>
                                    <td>{formatDistanceToNow(new Date(cycle.startDate), {
                                        addSuffix: true,
                                        locale: ptBR,
                                    })}</td>
                                    <td>
                                        { cycle.finishedDate &&  (
                                            <Status statusColor="green">Concluído</Status> 
                                        )}
                                        { cycle.interruptedDate &&  (
                                            <Status statusColor="red">Interrompido</Status> 
                                        )}
                                        { !cycle.interruptedDate && !cycle.finishedDate && (
                                            <Status statusColor="yellow">Andamento</Status> 
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </HistoryList> 
        </HistoryContainer>
    )
  }