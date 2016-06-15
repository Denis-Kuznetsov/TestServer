function ball (Pos, Vel, Grav, R, timeboost, TableP, TableS, B1P, B1S, B2P, B2S)
{
    var self = this;
    
    var vm = new vecmath();

    self.Radius = R;
    self.StartPosition = Pos;
    self.StartVelocity = Vel;
    self.Gravity = Grav;
    
    self.TablePos = TableP;
    self.TableSize = TableS;

    self.Battledore1Pos = B1P;
    self.Battledore1Size = B1S;

    self.Battledore2Pos = B2P;
    self.Battledore2Size = B2S;

    self.start = Date.now();

    self.ElapsedTime = 0;
    self.RefV = self.StartVelocity;

    self.Position = self.StartPosition;
    self.Velocity = self.StartVelocity;
    self.ElapsedTime = (Date.now() - self.start) / 1000.0;
    
   

    self.Move = function() {
        var norm = new THREE.Vector3(0, 0, 1);

        /* Collision with table*/
        if (self.Position.y - self.Radius < self.TablePos.y && self.Position.x >= self.TablePos.x && self.Position.x <= self.TablePos.x + self.TableSize.x
                                                       && self.Position.z < self.TablePos.z && self.Position.z > self.TablePos.z - self.TableSize.z)
        {
            self.Position.y = self.TablePos.y + self.Radius;
            self.StartPosition = self.Position;
            self.StartVelocity = new THREE.Vector3(self.Velocity.x, -(self.Velocity.y + 0.01), self.Velocity.z);

            self.start = Date.now();
        }
        
        /* Collision with wall1 */
        if (self.Position.z - self.Radius < self.Battledore1Pos.z && self.Position.x >= self.Battledore1Pos.x && self.Position.x <= self.Battledore1Pos.x + self.Battledore1Size.x
                                                                  && self.Position.y >= self.Battledore1Pos.y && self.Position.y <= self.Battledore1Pos.y + self.Battledore1Size.y)
        {
            self.Position.z = self.Battledore1Pos.z + self.Radius;
            self.StartPosition = self.Position;
            self.StartVelocity = vm.Sub(self.Velocity, vm.Mul(norm, 2 * vm.Dot(self.Velocity, norm)));

            self.start = Date.now();
        }

        /* Collision with wall2 */
        if (self.Position.z + self.Radius > self.Battledore2Pos.z)
        {
            self.Position.z = self.Battledore2Pos.z - self.Radius;
            self.StartPosition = self.Position;            
            self.StartVelocity = vm.Sub(self.Velocity, vm.Mul(norm, 2 * vm.Dot(self.Velocity, norm)));

            self.start = Date.now();
        }


        self.ElapsedTime = (Date.now() - self.start) / 1000.0;

        var g = new THREE.Vector3(0, -self.Gravity, 0);
        self.Position = vm.Sum(vm.Sum(self.StartPosition, vm.Mul(self.StartVelocity, self.ElapsedTime * timeboost)), vm.Mul(g, self.ElapsedTime * self.ElapsedTime * timeboost * timeboost / 2));
        self.Velocity = vm.Sum(self.StartVelocity, vm.Mul(g, self.ElapsedTime * timeboost));
    };
}
