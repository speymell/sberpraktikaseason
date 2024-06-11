package Sber.Sber.Controllers;

import Sber.Sber.auth.request.CreateClientRequest;
import Sber.Sber.auth.service.ClientService;
import Sber.Sber.common.ApiResponse;
import Sber.Sber.repositories.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")

public class ClientController {

    private final ClientService clientService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/createclient")
    public ResponseEntity<String> createClient(@Valid @RequestBody CreateClientRequest createClientRequest){
        clientService.createClient(createClientRequest);
        return ResponseEntity.ok(new ApiResponse(true, "В компанию с ID :" + createClientRequest.getId_company()+ " добавлен клиент с ID: " + createClientRequest.getId_user()) + " успешно");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/clients/{companyid}")
    public ResponseEntity<List<ClientRepository.ClientProjection>> f(@PathVariable("companyid") Long companyid) {
        return ResponseEntity.ok(clientService.listClientCompany(companyid));
    }
}
